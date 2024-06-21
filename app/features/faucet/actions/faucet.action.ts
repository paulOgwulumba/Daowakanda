import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';
import { RegisterFaucetDto } from '@/interfaces';

export const useFaucetActions = () => {
  const fetchWrapper = useFetchWrapper();

  const registerFaucet = useCallback(async (dto: RegisterFaucetDto) => {
    try {
      const response = await fetchWrapper.post('faucet-verification/', dto);

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  return {
   registerFaucet,
  };
};
