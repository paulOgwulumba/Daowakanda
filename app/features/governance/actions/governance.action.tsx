import { useNotify } from '@/hooks';
import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import {
  CreateProposalDto,
  CreateVoteDto,
  VerifyVoteDto,
} from '@/interfaces/governance.interface';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { ProposalsAtom, VotesAtom } from '../state/governance.atom';

export const useGovernanceActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setProposals = useSetRecoilState(ProposalsAtom);
  const setVotes = useSetRecoilState(VotesAtom);
  const { notify } = useNotify();

  const getAllProposals = useCallback(async () => {
    try {
      const response = await fetchWrapper.get('api/v1/proposals/proposal/');
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

  const getAllVotes = useCallback(async () => {
    try {
      const response = await fetchWrapper.get('api/v1/proposals/vote/');
      if (Array.isArray(response)) {
        setVotes(response);
      }
      return response;
    } catch (error) {
      notify.error(
        error?.toString() || 'There was a problem loading the votes.',
      );
      return { error };
    }
  }, []);

  const createProposal = useCallback(async (dto: CreateProposalDto) => {
    try {
      const response = await fetchWrapper.post(
        'api/v1/proposals/proposal/',
        dto,
      );

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const deleteProposal = useCallback(async (id: string) => {
    try {
      const response = await fetchWrapper.delete(
        `api/v1/proposals/proposal/${id}/`,
      );

      return response;
    } catch (error) {
      return { error };
    }
  }, []);

  const verifyVote = useCallback(async (dto: VerifyVoteDto) => {
    try {
      const response = await fetchWrapper.post(
        'api/v1/proposals/verify-vote/',
        dto,
      );
      return response;
    } catch (error) {
      return { error };
    }
  }, []);

  const castVote = useCallback(async (dto: CreateVoteDto) => {
    try {
      const response = await fetchWrapper.post('api/v1/proposals/vote/', dto);
      return response;
    } catch (error) {
      return { error };
    }
  }, []);

  return {
    getAllProposals,
    getAllVotes,
    createProposal,
    deleteProposal,
    verifyVote,
    castVote,
  };
};
