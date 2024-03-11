import { useCallback, useContext } from 'react';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { authAtom } from '../../features/auth/state';
import { RequestMethod } from '../../enums/requestMethod.enum';
import { useRouter } from 'next/router';
import { RequestOptions } from '../../interfaces/requestOption.interface';
import { Token } from '../../interfaces';
import { ConfigContext } from '../../providers/config/ConfigContext';

export const useFetchWrapper = () => {
    const { push } = useRouter();
    const [auth, setAuth] = useRecoilState(authAtom);
    const { apiUrl } = useContext(ConfigContext);

    const generateAuthHeader = useCallback((auth: Token | null) => {
        const token = auth && auth.accessToken;
        const isLoggedIn = !!token;

        if (isLoggedIn) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }, []);

    const handleResponse = useCallback(
        (
            response: any,
            auth: Token | null,
            setAuth: SetterOrUpdater<Token | null>,
            push: any,
        ) => {
            return response.text().then(async (text: string) => {
                const data = text && JSON.parse(text);

                if (!response.ok) {
                    if (
                        [401].includes(response.status) &&
                        auth &&
                        auth.accessToken
                    ) {
                        await localStorage.removeItem('auth');
                        await localStorage.removeItem('lastLoggedIn');
                        push('/auth/login');
                    }

                    const error =
                        (data && data.message) ||
                        response.statusText ||
                        (data && data.errors);

                    return { error, code: response.status };
                }

                return data;
            });
        },
        [],
    );

    const request = useCallback((method: RequestMethod) => {
        return (url: string, body?: any, token?: Token) => {
            let accessToken = auth;

            if (token) {
                setAuth(token);
                accessToken = token;
            }

            const requestOptions: RequestOptions = {
                method,
                headers: generateAuthHeader(accessToken),
            };

            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }

            return fetch(`${apiUrl}/${url}`, requestOptions as RequestInit)
                .then((response) =>
                    handleResponse(response, auth, setAuth, push),
                )
                .catch((err) => {
                    return { error: err };
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
