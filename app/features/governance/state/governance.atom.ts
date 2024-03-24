import { IProposal } from '@/interfaces/governance.interface';
import { atom } from 'recoil';

export const ProposalsAtom = atom<IProposal[]>({
  default: [],
  key: 'proposals-atom',
});
