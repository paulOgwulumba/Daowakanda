import { DaoWakandaClient } from '@/clients/DaoWakandaClient.client';
import { useNotify } from '@/hooks';
import {
  ICreateProposalContract,
  ICreateProposalContractApi,
  IVoteProposalDto,
} from '@/interfaces/proposal.interface';
import * as algokit from '@algorandfoundation/algokit-utils';
import { useWallet } from '@txnlab/use-wallet-react';
import {
  makeAssetTransferTxnWithSuggestedParamsFromObject,
  makePaymentTxnWithSuggestedParamsFromObject,
} from 'algosdk';
import { useCallback } from 'react';

export const useProposalContract = () => {
  const { activeAddress, transactionSigner: signer, algodClient } = useWallet();
  const { notify } = useNotify();

  const createProposal = useCallback(
    async (
      dto: ICreateProposalContract,
    ): Promise<ICreateProposalContractApi | undefined> => {
      const sender = { signer, addr: activeAddress || '' };

      const appClient = new DaoWakandaClient(
        {
          resolveBy: 'id',
          id: 0,
          sender,
        },
        algodClient,
      );

      try {
        const response = await appClient.create.createApplication(dto);
        notify.success('Proposal created successfully');

        return {
          title: dto.title,
          description: dto.description,
          startDate: Date.now(),
          endDate: dto.endDate,
          creator: sender.addr,
          appId: String(response.appId),
        };
      } catch (error) {
        notify.error(
          error?.toString() || 'There was a problem creating the proposal.',
        );
      }
    },
    [signer, activeAddress],
  );

  const createProposalASA = useCallback(
    async (appId: string) => {
      const sender = { signer, addr: activeAddress || '' };
      const appClient = new DaoWakandaClient(
        {
          resolveBy: 'id',
          id: Number(appId),
          sender,
        },
        algodClient,
      );

      const suggestedParams = await algokit.getTransactionParams(
        undefined,
        algodClient,
      );
      const transaction = makePaymentTxnWithSuggestedParamsFromObject({
        from: sender.addr,
        to: (await appClient.appClient.getAppReference()).appAddress,
        amount: 200_000,
        suggestedParams,
      });

      try {
        const result = await appClient.createDaoAsa(
          {
            minimumBalanceTransaction: {
              transaction,
              signer: sender,
            },
          },
          {
            sendParams: {
              fee: algokit.microAlgos(10_000),
            },
          },
        );

        return { asaId: String(result.return!.valueOf()) };
      } catch (error) {
        notify.error(
          error?.toString() ||
            'There was a problem creating the Asset for voting in the proposal.',
        );
      }
    },
    [signer, activeAddress],
  );

  const optInToProposalAsa = useCallback(
    async (assetId: string) => {
      const sender = { signer, addr: activeAddress || '' };

      if (!activeAddress) {
        notify.error('Please connect your wallet to continue');
        return;
      }

      try {
        const accountInfo = await algodClient
          .accountAssetInformation(activeAddress, Number(assetId))
          .do();
        return accountInfo;
      } catch (error) {
        try {
          const suggestedParams = await algokit.getTransactionParams(
            undefined,
            algodClient,
          );
          const txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: activeAddress,
            to: activeAddress,
            amount: 0,
            assetIndex: Number(assetId),
            suggestedParams,
          });

          await algokit.sendTransaction(
            {
              transaction: txn,
              from: sender,
            },
            algodClient,
          );

          const accountInfo = await algodClient
            .accountAssetInformation(activeAddress, Number(assetId))
            .do();
          return accountInfo;
        } catch (error) {
          notify.error(
            error?.toString() ||
              'There was a problem opting you into the asset',
          );
        }
      }
    },
    [activeAddress],
  );

  const registerForProposal = useCallback(
    async (appId: string, assetId: string) => {
      const sender = { signer, addr: activeAddress || '' };

      const appClient = new DaoWakandaClient(
        {
          resolveBy: 'id',
          id: Number(appId),
          sender,
        },
        algodClient,
      );

      if (!activeAddress) {
        notify.error('Please connect your wallet to continue');
        return;
      }

      try {
        await appClient.register(
          { registeredASA: Number(assetId) },
          {
            sender,
            sendParams: {
              fee: algokit.microAlgos(3_000),
            },
          },
        );

        return { appId, assetId };
      } catch (error) {
        notify.error(
          error?.toString() ||
            'There was a problem registering to vote in the proposal',
        );
      }
    },
    [],
  );

  const voteForProposal = useCallback(
    async (
      appId: string,
      assetId: string,
      vote: boolean,
    ): Promise<IVoteProposalDto | undefined> => {
      const sender = { signer, addr: activeAddress || '' };

      const appClient = new DaoWakandaClient(
        {
          resolveBy: 'id',
          id: Number(appId),
          sender,
        },
        algodClient,
      );

      if (!activeAddress) {
        notify.error('Please connect your wallet to continue');
        return;
      }

      try {
        await appClient.vote(
          { registeredASA: Number(assetId), inFavor: vote },
          {
            sender,
            sendParams: {
              fee: algokit.microAlgos(4_000),
            },
          },
        );

        return { appId, voterAddress: activeAddress, vote };
      } catch (error) {
        notify.error(
          error?.toString() || 'There was a problem casting your vote.',
        );
      }
    },
    [],
  );

  return {
    createProposal,
    createProposalASA,
    optInToProposalAsa,
    registerForProposal,
    voteForProposal,
  };
};
