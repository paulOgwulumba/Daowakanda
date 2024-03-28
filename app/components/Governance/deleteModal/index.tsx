import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useNotify } from '@/hooks';
import axios from 'axios';

interface Props {
  isActive: boolean;
  onclick: any;
  id: any;
  setDeleteModal: any;
}
const client = axios.create({
  baseURL: 'https://api.daowakanda.com/api/v1/proposals/proposal/',
});

export function DeleteModal({ isActive, onclick, id, setDeleteModal }: Props) {
  const { deleteProposal, getAllProposals } = useGovernanceActions();
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();

  const onDelete = () => {
    console.log('delete called');
    setLoading(true);
    // const response = await deleteProposal(id);
    axios
      .delete(`https://api.daowakanda.com/api/v1/proposals/proposal/${id}/`)
      .then(() => {
        setTimeout(() => {
          notify.success('Proposal Successfully Deleted');
          setDeleteModal(false);
        }, 1300);
        setLoading(false);
        getAllProposals();
      })
      .catch(() => {
        notify.error('delete proposal not successfull');
        setTimeout(() => {
          setDeleteModal(false);
        }, 1000);
      });

    // if (response.error) {
    //   notify.error('delete proposal not successfull');
    //   setTimeout(() => {
    //     setDeleteModal(false);
    //   }, 1000);
    // } else {
    //   setTimeout(() => {
    //     notify.success('Proposal Successfully Deleted');
    //     setDeleteModal(false);
    //   }, 1300);
    //   setLoading(false);
    //   getAllProposals();
    // }
  };
  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <div className={styles['heading-section']}>
            Are you sure you want to delete this proposal
          </div>
          <div className={styles['options']}>
            <div className={styles['cancel']} onClick={onclick}>
              No, Cancel
            </div>
            <div className={styles['delete']} onClick={onDelete}>
              {loading ? `Deleting` : ` Yes, Delete`}
            </div>
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
