import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { CardAfterVote } from './CardAfterVote';
import { CardVote } from './CardVote';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useRecoilValue } from 'recoil';
import { ProposalsAtom } from '@/features/governance/state/governance.atom';
import { CardVoteLoader } from './CardVoteLoader';

export const Proposals = () => {
  const [itemDeleted, setItemDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { getAllProposals } = useGovernanceActions();
  const proposals = useRecoilValue(ProposalsAtom);

  const filterProposals = () => {
    if (searchTerm) {
      return proposals.filter((proposal) =>
        proposal.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return proposals;
  };

  useEffect(() => {
    getAllProposals();
  }, [itemDeleted]);

  return (
    <div className={styles['body-section']}>
      <div className={styles['form']}>
        <div className={styles['input']}>
          <input type="text" placeholder="All" />
          <IoIosArrowDown className={styles['icon']} />
        </div>
        <div className={styles['input-search']}>
          <input
            type="text"
            placeholder="Search proposals"
            name={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoIosSearch className={styles['icon']} />
        </div>
      </div>
      <div className={styles['main-section']}>
        {proposals.length <= 0 &&
          [1, 2, 3].map((item, index) => <CardVoteLoader key={index} />)}
        {filterProposals().map((proposal, index) => (
          <CardVote
            key={index}
            title={proposal?.name}
            yesVote={proposal?.yes_count}
            tag={proposal?.tag_id}
            isActive={proposal?.is_active}
            description={proposal?.description}
            noVote={proposal?.no_count}
            end_time={proposal?.end_time}
            created_on={proposal?.created_on}
            id={proposal?.id}
            setItemDeleted={setItemDeleted}
            proposalData={proposal}
          />
        ))}
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
      </div>
    </div>
  );
};
