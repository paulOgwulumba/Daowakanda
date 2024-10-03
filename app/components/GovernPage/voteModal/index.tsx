import React, { useState } from 'react';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from 'react-icons/md';
import { useProposalActions } from '@/features/governance/actions/proposal.action';
import { useProposalContract } from '@/features/governance/actions/proposal.contract';
import { IProposalContract } from '@/interfaces/proposal.interface';
import { Spinner } from '@/components/shared';
import { useNotify } from '@/hooks';
import toast from 'react-hot-toast';

interface Props {
  isActive: boolean;
  onclick: () => any;
  proposal: IProposalContract;
  updateProposal?: (proposal: IProposalContract) => void;
}

enum Vote {
  APPROVE = 'Approve',
  DENY = 'Deny',
  MAYBE = 'Maybe',
}

export function VoteModal({
  isActive,
  onclick,
  proposal,
  updateProposal,
}: Props) {
  const [checked, setChecked] = useState('');
  const [loading, setLoading] = useState(false);
  const { activeAddress } = useWallet();
  const { notify } = useNotify();
  const { validateWalletAddress, voteForProposal: uploadVote } =
    useProposalActions();
  const { optInToProposalAsa, registerForProposal, voteForProposal } =
    useProposalContract();

  const submit = async () => {
    if (loading) return;

    setLoading(true);

    if (!activeAddress) {
      notify.error(`Please connect your wallet to continue`);
      setLoading(false);
      return;
    }

    if (!proposal.asaId) {
      notify.error(`Voting has not started on this proposal yet`);
      setLoading(false);
      return;
    }

    toast.loading('Validating your wallet address...', { id: 'loader' });
    const validationRes = await validateWalletAddress(activeAddress!);
    toast.dismiss('loader');

    if (!validationRes) {
      setLoading(false);
      return;
    }

    toast.loading('Opting into proposal asset...', { id: 'loader' });
    const optinRes = await optInToProposalAsa(proposal.asaId);
    toast.dismiss('loader');

    if (!optinRes) {
      setLoading(false);
      return;
    }

    if (optinRes['asset-holding']?.amount > 0) {
      // Skip registration
      if (optinRes['asset-holding']?.amount > 1) {
        // user voted already.
        toast.error('You have voted already and cannot vote twice.');
        setLoading(false);
        return;
      }
    } else {
      // Register
      toast.loading('Registering for proposal...', { id: 'loader' });
      const registerRes = await registerForProposal(
        proposal.appId,
        proposal.asaId,
      );
      toast.dismiss('loader');

      if (!registerRes) {
        setLoading(false);
        return;
      }
    }

    // Vote
    toast.loading('Voting...', { id: 'loader' });
    const voteRes = await voteForProposal(
      proposal.appId,
      proposal.asaId,
      checked === 'Approve',
    );
    toast.dismiss('loader');

    if (!voteRes) {
      setLoading(false);
      return;
    }

    notify.success('Vote submitted successfully');

    toast.loading('Updating proposal information...', { id: 'loader' });
    const updatedProposal = await uploadVote(voteRes);
    toast.dismiss('loader');

    setLoading(false);

    if (updatedProposal?.appId) {
      notify.success('The proposal information was successfully updated');
      updateProposal?.(updatedProposal);
      onclick();
    }
  };

  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <div className={styles['title']}>Vote</div>

          <div className={styles['options']}>
            <div
              className={
                styles[checked === Vote.APPROVE ? 'option-checked' : 'option']
              }
              onClick={() => setChecked(Vote.APPROVE)}
            >
              {checked === Vote.APPROVE ? (
                <MdOutlineRadioButtonChecked
                  className={styles['icon-checked']}
                />
              ) : (
                <MdOutlineRadioButtonUnchecked className={styles['icon']} />
              )}
              Approve
            </div>

            <div
              className={
                styles[checked === Vote.DENY ? 'option-checked' : 'option']
              }
              onClick={() => setChecked(Vote.DENY)}
            >
              {checked === Vote.DENY ? (
                <MdOutlineRadioButtonChecked
                  className={styles['icon-checked']}
                />
              ) : (
                <MdOutlineRadioButtonUnchecked className={styles['icon']} />
              )}
              Deny
            </div>
          </div>

          <button
            onClick={submit}
            disabled={!checked}
            className={styles['submit-btn']}
          >
            {loading ? 'Submitting...' : 'Submit vote'}
          </button>
        </div>
      </BackgroundOverlay>
    </>
  );
}
