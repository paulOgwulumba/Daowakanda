import { ProposalsClient } from '@/clients/proposalsRecent.client';
import { APP_ID, ASSET_ID } from '@/constants/appId';
import { useNotify } from '@/hooks';
import {
  CreateProposalDto,
  IProposal,
} from '@/interfaces/governance.interface';
import * as algokit from '@algorandfoundation/algokit-utils';
import { useWallet } from '@txnlab/use-wallet';
import { useCallback } from 'react';

export const useGovernanceContract = () => {
  const { activeAddress, signer } = useWallet();
  const { notify } = useNotify();
  const algodClient = algokit.getAlgoClient({
    server: 'https://testnet-api.algonode.cloud',
  });
  const sender = { signer, addr: activeAddress || '' };

  const typedClient = new ProposalsClient(
    {
      resolveBy: 'id',
      id: APP_ID,
    },
    algodClient,
  );

  const castVote = useCallback(
    async (proposal: IProposal, vote: 'yes' | 'no') => {
      const sender = { signer, addr: activeAddress || '' };
      if (!sender.addr) {
        notify.error('Please connect your wallet to proceed');
        return { error: 'Wallet not connected' };
      }

      try {
        vote === 'yes'
          ? await typedClient.voteYes(
              {
                proposal_name: proposal.name,
                // membership_token: proposal.is_claimable ? ASSET_ID : undefined,
              },
              {
                sender,
                boxes: [
                  {
                    appId: Number(proposal.app_id),
                    name: proposal.name,
                  },
                ],
              },
            )
          : await typedClient.voteNo(
              {
                proposal_name: proposal.name,
                // membership_token: proposal.is_claimable ? ASSET_ID : undefined,
              },
              {
                sender,
                boxes: [
                  {
                    appId: Number(proposal.app_id),
                    name: proposal.name,
                  },
                ],
              },
            );
        notify.success('Your vote was recorded successfully');
      } catch (error) {
        notify.error('There was a problem casting your vote');
        return { error };
      }
    },
    [activeAddress, signer],
  );

  const castVoteYes = useCallback(
    async (proposal: IProposal) => {
      return await castVote(proposal, 'yes');
    },
    [activeAddress, signer],
  );

  const castVoteNo = useCallback(
    async (proposal: IProposal) => {
      return await castVote(proposal, 'no');
    },
    [activeAddress, signer],
  );

  const submitProposal = useCallback(
    async (dto: CreateProposalDto) => {
      if (!sender.addr) {
        notify.error('Please connect your wallet to proceed');
        return { error: 'Wallet not connected' };
      }

      try {
        await typedClient.appClient.fundAppAccount({
          amount: algokit.microAlgos(200_000),
          sender,
        });
      } catch (error) {
        notify.error(
          (error as unknown as Error).message ||
            'There was a problem funding the app account with 0.2 Algos',
        );
        return { error };
      }

      try {
        const res = await typedClient.addProposal(
          {
            name: dto.name,
            description: dto.description,
            end_time: Number(dto.end_time),
            // membership_token: dto.is_claimable ? ASSET_ID : undefined,
          },
          {
            sender,
            boxes: [
              {
                appId: Number(dto.app_id),
                name: dto.name,
              },
            ],
          },
        );

        if (res?.transaction) {
          notify.success(
            'The proposal was submitted to the blockchain successfully',
          );
          return { transaction: res.transaction };
        } else {
          notify.error(`There was a problem creating the proposal`);
          return { error: 'Something went wrong' };
        }
      } catch (error) {
        notify.error(
          (error as unknown as Error).message ||
            'There was a problem creating the proposal.',
        );
        return { error };
      }
    },
    [activeAddress, signer],
  );

  const retrieveProposal = useCallback(
    async (name: string) => {
      if (!sender.addr) {
        notify.error('Please connect your wallet to proceed');
        return { error: 'Wallet not connected' };
      }

      try {
        const res = await typedClient.readProposal(
          {
            name,
          },
          {
            sender,
            boxes: [
              {
                appId: Number(APP_ID),
                name,
              },
            ],
          },
        );

        if (res.return?.name) {
          return res.return;
        } else {
          throw new Error(
            'There was a problem reading the updated proposal details from the blockchain network.',
          );
        }
      } catch (error) {
        notify.error(
          (error as unknown as Error).message ||
            'There was a problem reading the updated proposal details from the blockchain network.',
        );
        return { error };
      }
    },
    [activeAddress, signer],
  );

  return {
    castVoteYes,
    castVoteNo,
    submitProposal,
    retrieveProposal,
  };
};
