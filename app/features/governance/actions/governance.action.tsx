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
      const response = await fetchWrapper.get('proposal/');
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
      const response = await fetchWrapper.get('vote/');
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
      const response = await fetchWrapper.post('proposal/', dto);

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const deleteProposal = useCallback(async (id: string) => {
    try {
      const response = await fetchWrapper.delete(`proposal/${id}/`);

      return response;
    } catch (error) {
      return { error };
    }
  }, []);

  const verifyVote = useCallback(async (dto: VerifyVoteDto) => {
    try {
      const response = await fetchWrapper.post('verify-vote/', dto);
      return response;
    } catch (error) {
      return { error };
    }
  }, []);

  const castVote = useCallback(async (dto: CreateVoteDto) => {
    try {
      const response = await fetchWrapper.post('vote/', dto);
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
