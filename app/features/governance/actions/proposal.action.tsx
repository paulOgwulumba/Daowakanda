import { useNotify } from '@/hooks';
import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { ProposalContractsAtom } from '../state/governance.atom';
import {
  IBootstrapProposalDto,
  ICreateProposalContractApi,
  IProposalContract,
  ValidateWalletAddressResponse,
} from '@/interfaces/proposal.interface';

export const useProposalActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setProposals = useSetRecoilState(ProposalContractsAtom);
  const { notify } = useNotify();

  const validateWalletAddress = useCallback(async (address: string) => {
    try {
      const response = await fetchWrapper.post('proposal/validate-address', {
        address,
      });

      return response as ValidateWalletAddressResponse;
    } catch (error) {
      notify.error(error?.toString() || 'Invalid algorand wallet address.');
    }
  }, []);

  const getAllProposals = useCallback(async () => {
    try {
      const response = await fetchWrapper.get('proposal/all');
      if (Array.isArray(response)) {
        setProposals(response);
      }
      return response;
    } catch (error) {
      notify.error(
        error?.toString() || 'There was a problem loading the proposals.',
      );
      return { error };
    }
  }, []);

  const createProposal = useCallback(
    async (dto: ICreateProposalContractApi) => {
      try {
        const response = await fetchWrapper.post('proposal', dto);

        return response as IProposalContract;
      } catch (error) {
        notify.error(
          error?.toString() ||
            'There was a problem updating the information of the created proposal.',
        );
      }
    },
    [],
  );

  const bootstrapProposal = useCallback(async (dto: IBootstrapProposalDto) => {
    try {
      const response = await fetchWrapper.post(
        `proposal/${dto.appId}/bootstrap`,
        { asaId: dto.asaId },
      );

      return response as IProposalContract;
    } catch (error) {
      notify.error(
        error?.toString() ||
          'There was a problem bootstrapping the created proposal.',
      );
    }
  }, []);

  return {
    getAllProposals,
    validateWalletAddress,
    createProposal,
    bootstrapProposal,
  };
};
