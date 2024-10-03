import React, { useEffect } from 'react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';
import { CreateProposalDto } from '@/interfaces/governance.interface';
import { APP_ID } from '@/constants/appId';
import { useGovernanceContract } from '@/features/governance/actions/governance.contract';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useNotify } from '@/hooks';
import moment from 'moment';
import { ThreeDots } from 'react-loader-spinner';
import { useWallet } from '@txnlab/use-wallet-react';
import { useProposalContract } from '@/features/governance/actions/proposal.contract';
import { useProposalActions } from '@/features/governance/actions/proposal.action';
import { ICreateProposalContract } from '@/interfaces/proposal.interface';
import toast from 'react-hot-toast';

interface Props {
  isActive: boolean;
  onclick: () => any;
  setCreateProposalModal: any;
}

export function CreateProposalModal({
  isActive,
  onclick,
  setCreateProposalModal,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { createProposal, createProposalASA } = useProposalContract();
  const {
    createProposal: create,
    bootstrapProposal,
    getAllProposals,
    validateWalletAddress,
  } = useProposalActions();
  const { notify } = useNotify();
  const { activeAddress } = useWallet();
  const now = Date.now();

  const [data, setData] = useState<ICreateProposalContract>({
    title: '',
    description: '',
    endDate: 0,
  });

  const submit = async () => {
    if (!activeAddress) {
      notify.error('Please connect to a wallet to create a proposal.');
      return;
    }

    setLoading(true);

    toast.loading('Checking if address is eligible to create proposal...', {
      id: 'loader',
    });
    const validationRes = await validateWalletAddress(activeAddress);
    toast.dismiss('loader');

    if (!validationRes?.valid) {
      setLoading(false);
      return;
    }

    toast.loading('Creating proposal...', { id: 'loader' });
    const response = await createProposal(data);
    toast.dismiss('loader');

    if (!response) {
      setLoading(false);
      return;
    }

    notify.success('Proposal created successfully');
    toast.loading('Uploading proposal info...', { id: 'loader' });
    const uploadRes = await create(response);
    toast.dismiss('loader');

    if (!uploadRes) {
      setLoading(false);
      return;
    }

    notify.success('Proposal info uploaded successfully');

    toast.loading('Creating proposal ASA...', { id: 'loader' });
    const createAssetRes = await createProposalASA(uploadRes.appId);
    toast.dismiss('loader');

    if (!createAssetRes) {
      setLoading(false);
      return;
    }

    notify.success('Proposal asset created successfully');

    toast.loading('Uploading updaed proposal info...', { id: 'loader' });

    const uploadAssetRes = await bootstrapProposal({
      appId: uploadRes.appId,
      asaId: createAssetRes.asaId,
    });

    toast.dismiss('loader');

    if (uploadAssetRes) {
      notify.success('Updated proposal info uploaded successfully');
    }

    setLoading(false);
    getAllProposals();

    onclick();
  };

  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <div className={styles['cancel-icon']}>
            <IoMdClose className={styles['icon']} onClick={onclick} />
          </div>
          <div className={styles['heading-section']}>Create Proposal</div>
          <div className={styles['form']}>
            <div className={styles['form-control']}>
              <label>Proposal Title</label>
              <input
                type="text"
                placeholder="Enter Proposal Title..."
                value={data.title}
                onChange={(evt) =>
                  setData((data) => ({
                    ...data,
                    title: evt.target.value,
                  }))
                }
                required
              />
            </div>
            <div className={styles['form-control']}>
              <label>Proposal Description</label>
              <textarea
                name="Proposal Description"
                placeholder="Say something about the proposal..."
                value={data.description}
                onChange={(evt) =>
                  setData((data) => ({
                    ...data,
                    description: evt.target.value,
                  }))
                }
                required
              ></textarea>
            </div>
            <div className={styles['date-section']}>
              <div className={styles['date-control']}>
                <label>End Date</label>
                <input
                  type="datetime-local"
                  onChange={(evt) => {
                    const date = new Date(evt.target.value);
                    const dateUnix = date.valueOf();

                    if (dateUnix < now) {
                      notify.error('End date cannot be in the past');
                      return;
                    }

                    setData((data) => ({
                      ...data,
                      endDate: dateUnix,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            {/* <div className={styles['claim-section']}>
              <input
                type="checkbox"
                checked={data.is_claimable}
                onChange={() => {
                  setData((data) => ({
                    ...data,
                    is_claimable: !data.is_claimable,
                  }));
                }}
              />
              <label>Claimable Proposal</label>
            </div> */}
            <button
              className={styles['submit']}
              disabled={!data.title || !data.description || data.endDate < now}
              onClick={submit}
            >
              {loading && (
                <ThreeDots
                  visible={true}
                  height="30"
                  width="80"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
              {loading ? `Submitting Proposal...` : `Submit Proposal`}
            </button>
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
