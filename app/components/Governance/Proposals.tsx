import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { CardAfterVote } from './CardAfterVote';
import { CardVote } from './CardVote';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { DeleteModal } from './deleteModal';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useRecoilValue } from 'recoil';
import { ProposalsAtom } from '@/features/governance/state/governance.atom';

export const Proposals = () => {
  const [deleteProposalModal, setDeleteProposalModal] = useState(false);
  const { getAllProposals } = useGovernanceActions();
  const proposals = useRecoilValue(ProposalsAtom);

  const toggleDeleteProposal = () => {
    setDeleteProposalModal(!deleteProposalModal);
  };

  useEffect(() => {
    getAllProposals();
  }, []);

  return (
    <div className={styles['body-section']}>
      <div className={styles['form']}>
        <div className={styles['input']}>
          <input type="text" placeholder="All" />
          <IoIosArrowDown className={styles['icon']} />
        </div>
        <div className={styles['input-search']}>
          <input type="text" placeholder="Search proposals" />
          <IoIosSearch className={styles['icon']} />
        </div>
      </div>
      <div className={styles['main-section']}>
        <CardVote
          title={'Algorand Hackathon Event in Abuja'}
          yesVote={'93.64'}
          onclick={toggleDeleteProposal}
        />
        <CardAfterVote
          title={'Community Funding'}
          date={'Ended 14th Oct, 2023'}
          tag={'Tag #35'}
          status={'Approved'}
          color={'#003A03'}
        />
        <CardAfterVote
          title={'Party at Sharaton'}
          date={'Ended 14th Oct, 2023'}
          tag={'Tag #35'}
          status={'Rejected'}
          color={'#690005'}
        />
        <CardAfterVote
          title={'Community Funding'}
          date={'Ended 14th Oct, 2023'}
          tag={'Tag #31'}
          status={'Approved'}
          color={'#003A03'}
        />
        <CardAfterVote
          title={'Party at Sharaton'}
          date={'Ended 14th Oct, 2023'}
          tag={'Tag #35'}
          status={'Rejected'}
          color={'#690005'}
        />
        <CardAfterVote
          title={'Community Funding'}
          date={'Ended 14th Oct, 2023'}
          tag={'Tag #31'}
          status={'Approved'}
          color={'#003A03'}
        />
      </div>

      {deleteProposalModal && (
        <DeleteModal
          isActive={deleteProposalModal}
          onclick={() => setDeleteProposalModal(false)}
        />
      )}
    </div>
  );
};
