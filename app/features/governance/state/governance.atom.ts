import { IProposal, IVote } from '@/interfaces/governance.interface';
import { IProposalContract } from '@/interfaces/proposal.interface';
import { atom } from 'recoil';

export const ProposalsAtom = atom<IProposal[]>({
  default: [],
  key: 'proposals-atom',
});

export const VotesAtom = atom<IVote[]>({
  default: [],
  key: 'votes-atom',
});

export const ProposalContractsAtom = atom<IProposalContract[]>({
  default: [],
  key: 'proposals-atom',
});
