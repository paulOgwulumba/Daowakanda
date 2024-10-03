import { useCallback } from 'react';
import { RequestMethod } from '../../enums/requestMethod.enum';
import { RequestOptions } from '../../interfaces/requestOption.interface';

export const useFetchWrapper = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleResponse = useCallback((response: globalThis.Response) => {
    return response
      .text()
      .then(async (text: string) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
          const error =
            (data && data.message) ||
            response.statusText ||
            (data && data.errors);

          return {
            error,
            status: response.status,
            data: undefined,
          };
        }

        const responseData = data.message || data;

        return {
          data: responseData,
          status: response.status,
          error: undefined,
        };
      })
      .catch((error: any) => {
        return {
          data: undefined,
          status: response.status,
          error: error.message || 'An error occurred',
        };
      });
  }, []);

  const request = useCallback((method: RequestMethod) => {
    return (url: string, body?: any) => {
      const requestOptions: RequestOptions = {
        method,
        headers: {},
      };

      if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }

      return fetch(`${apiUrl}/${url}`, requestOptions as RequestInit)
        .then((response) => handleResponse(response))
        .catch((error) => {
          return { error, status: 500, data: undefined };
        });
    };
  }, []);

  return {
    get: request(RequestMethod.GET),
    post: request(RequestMethod.POST),
    put: request(RequestMethod.PUT),
    delete: request(RequestMethod.DELETE),
    patch: request(RequestMethod.PATCH),
  };
};
