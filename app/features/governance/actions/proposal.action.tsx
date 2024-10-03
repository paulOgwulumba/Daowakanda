import { useNotify } from '@/hooks';
import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { ProposalContractsAtom } from '../state/governance.atom';
import {
  IBootstrapProposalDto,
  ICreateProposalContractApi,
  IProposalContract,
  IVoteProposalDto,
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

      if (response.data) {
        return response.data as ValidateWalletAddressResponse;
      }

      notify.error(
        response.error?.toString() || 'Invalid algorand wallet address.',
      );
    } catch (error) {
      notify.error(error?.toString() || 'Invalid algorand wallet address.');
    }
  }, []);

  const getAllProposals = useCallback(async () => {
    try {
      const response = await fetchWrapper.get('proposal/all');

      if (response.data) {
        setProposals(response.data);
        return response.data as IProposalContract[];
      }

      notify.error(response.error?.toString() || 'Something went wrong.');
    } catch (error) {
      notify.error(
        error?.toString() || 'There was a problem loading the proposals.',
      );
    }
  }, []);

  const createProposal = useCallback(
    async (dto: ICreateProposalContractApi) => {
      try {
        const response = await fetchWrapper.post('proposal', dto);

        if (response.data) {
          return response.data as IProposalContract;
        }

        notify.error(response.error?.toString() || 'Something went wrong.');
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

      if (response.data) {
        return response.data as IProposalContract;
      }

      notify.error(response.error?.toString() || 'Something went wrong.');
    } catch (error) {
      notify.error(
        error?.toString() ||
          'There was a problem bootstrapping the created proposal.',
      );
    }
  }, []);

  const getProposalByAppId = async (appId: string) => {
    const response = await fetchWrapper.get(`proposal/${appId}`);

    if (response.data) {
      return response.data as IProposalContract;
    }

    notify.error(response.error?.toString() || 'Something went wrong.');
  };

  const voteForProposal = useCallback(async (dto: IVoteProposalDto) => {
    try {
      const response = await fetchWrapper.post(`proposal/${dto.appId}/vote`, {
        vote: dto.vote,
        voterAddress: dto.voterAddress,
      });

      if (response.data) {
        return response.data as IProposalContract;
      }

      notify.error(response.error?.toString() || 'Something went wrong.');
    } catch (error) {
      notify.error(
        error?.toString() ||
          'There was a problem submitting your vote to the proposal.',
      );
    }
  }, []);

  return {
    getAllProposals,
    validateWalletAddress,
    createProposal,
    bootstrapProposal,
    getProposalByAppId,
    voteForProposal,
  };
};
