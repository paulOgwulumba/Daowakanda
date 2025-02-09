import React from 'react';
import { useState } from 'react';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useNotify } from '@/hooks';
import { ThreeDots } from 'react-loader-spinner';

interface Props {
  isActive: boolean;
  onclick: any;
  id: any;
  setDeleteModal: any;
  setItemDeleted: any;
}

export function DeleteModal({
  isActive,
  onclick,
  id,
  setDeleteModal,
  setItemDeleted,
}: Props) {
  const { deleteProposal, getAllProposals } = useGovernanceActions();
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();

  const onDelete = async () => {
    console.log('delete called');
    setLoading(true);
    const response = await deleteProposal(id);
    console.log(response);

    if (response.error) {
      notify.error('delete proposal not successfull');
      setTimeout(() => {
        setDeleteModal(false);
      }, 1000);
    } else {
      setTimeout(() => {
        notify.success('Proposal Successfully Deleted');
        setDeleteModal(false);
      }, 1300);
      setLoading(false);
      setItemDeleted(true);
      getAllProposals();
    }
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
              {loading ? `Deleting...` : `Yes, Delete`}
            </div>
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
