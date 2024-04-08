import { IProposal, IVote } from '@/interfaces/governance.interface';
import { atom } from 'recoil';

export const ProposalsAtom = atom<IProposal[]>({
  default: [],
  key: 'proposals-atom',
});

export const VotesAtom = atom<IVote[]>({
  default: [],
  key: 'votes-atom',
});
