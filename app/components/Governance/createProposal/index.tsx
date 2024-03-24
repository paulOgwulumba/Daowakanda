import { title } from 'process';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';
import { CreateProposalDto } from '@/interfaces/governance.interface';
import { APP_ID } from '@/constants/appId';
import { useGovernanceContract } from '@/features/governance/actions/governance.contract';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useNotify } from '@/hooks';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

export function CreateProposalModal({ isActive, onclick }: Props) {
  const { submitProposal } = useGovernanceContract();
  const { createProposal, getAllProposals } = useGovernanceActions();
  const { notify } = useNotify();

  const [data, setData] = useState<CreateProposalDto>({
    app_id: String(APP_ID),
    name: '',
    description: '',
    is_claimable: false,
    end_time: 0,
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    const res = await submitProposal(data);

    if (res.error) {
      setLoading(false);
      return;
    }

    const response = await createProposal({
      ...data,
      end_time: new Date(data.end_time).toString(),
    });

    if (response.error) {
      notify.error(response.error?.toString() || 'Network error');
      setLoading(false);
      return;
    }

    getAllProposals();
    setLoading(false);
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
                value={data.name}
                onChange={(evt) =>
                  setData((data) => ({
                    ...data,
                    name: evt.target.value,
                  }))
                }
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
              ></textarea>
            </div>
            <div className={styles['options-block']}>
              <div className={styles['name']}>Options</div>
              <div className={styles['option']}>Option 1</div>
              <div className={styles['option']}>Option 2</div>
              <div className={styles['add-option']}>Add Option</div>
            </div>
            <div className={styles['date-section']}>
              <div className={styles['date-control']}>
                <label>Start Date</label>
                <input
                  type="date"
                  value={new Date(Date.now()).toDateString()}
                />
              </div>
              <div className={styles['date-control']}>
                <label>End Date</label>
                <input
                  type="date"
                  onChange={(evt) => {
                    const date = new Date(evt.target.value);
                    setData((data) => ({
                      ...data,
                      end_time: date.valueOf(),
                    }));
                  }}
                />
              </div>
            </div>
            <div className={styles['claim-section']}>
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
            </div>
            <button
              className={styles['submit']}
              disabled={!data.name || !data.description || !data.end_time}
              onClick={() => submit()}
            >
              {loading ? 'Submitting Proposal...' : 'Submit Proposal'}
            </button>
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
