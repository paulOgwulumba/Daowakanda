import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { CardAfterVote } from './CardAfterVote';
import { CardVote } from './CardVote';
import styles from './index.module.scss';
import { useEffect } from 'react';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useRecoilValue } from 'recoil';
import { ProposalsAtom } from '@/features/governance/state/governance.atom';

export const Proposals = () => {
  const { getAllProposals } = useGovernanceActions();
  const proposals = useRecoilValue(ProposalsAtom);

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
        {proposals &&
          proposals?.map((proposal, index) => (
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
            />
          ))}
        <CardVote
          title={'Algorand Hackathon Event in Abuja'}
          yesVote={'93.64'}
          tag="425252"
          isActive={true}
          description="hello testing cardss"
          noVote={'16.23'}
          end_time="31 3, 2024"
          created_on="27 3, 2024"
          id={23333}
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
      </div>
    </div>
  );
};
