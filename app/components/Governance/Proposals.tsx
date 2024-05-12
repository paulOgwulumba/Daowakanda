import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { CardVote } from './CardVote';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useRecoilValue } from 'recoil';
import { ProposalsAtom } from '@/features/governance/state/governance.atom';
import { CardVoteLoader } from './CardVoteLoader';
import moment from 'moment';

export const Proposals = () => {
  const [itemDeleted, setItemDeleted] = useState(false);
  const [optionsActive, setOptionsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { getAllProposals } = useGovernanceActions();
  const proposals = useRecoilValue(ProposalsAtom);

  const filterProposals = () => {
    if (searchTerm) {
      return [...proposals]
        .sort((a, b) => b.id - a.id)
        .filter((proposal) =>
          proposal.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }

    return [...proposals].sort((a, b) => b.id - a.id);
  };

  useEffect(() => {
    getAllProposals();
  }, [itemDeleted]);

  const voteEnded = (end_time: any) => {
    const viewCurr = moment().format('YYYY-MM-DD HH:mm:ss');
    const testEndDate = moment.utc(end_time).format('YYYY-MM-DD HH:mm:ss');
    if (testEndDate <= viewCurr) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles['body-section']}>
      <div className={styles['form']}>
        <div className={styles['filter-container']}>
          <div className={styles['selected']}>
            {selected}
            <IoIosArrowDown
              className={styles['icon']}
              onClick={() => setOptionsActive(!optionsActive)}
            />
          </div>
          {optionsActive && (
            <div className={styles['options']}>
              <div
                className={styles['option']}
                onClick={() => {
                  setSelected('All');
                  setOptionsActive(false);
                }}
              >
                All
              </div>
              <div
                className={styles['option']}
                onClick={() => {
                  setSelected('Pending');
                  setOptionsActive(false);
                }}
              >
                Pending
              </div>
              <div
                className={styles['option']}
                onClick={() => {
                  setSelected('Approved');
                  setOptionsActive(false);
                }}
              >
                Approved
              </div>
            </div>
          )}
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
        {filterProposals().map((proposal, index) => {
          if (selected == 'All' || selected == 'Pending') {
            if (!voteEnded(proposal?.end_time)) {
              return (
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
                  wallet_address={proposal?.wallet_address}
                  proposalData={proposal}
                />
              );
            }
          }
        })}
      </div>

      <div className={styles['main-section']}>
        {proposals.length <= 0 &&
          [1, 2, 3].map((item, index) => <CardVoteLoader key={index} />)}
        {filterProposals().map((proposal, index) => {
          if (
            (selected == 'Approved' &&
              proposal.yes_count > proposal.no_count) ||
            selected == 'All'
          ) {
            if (voteEnded(proposal?.end_time)) {
              return (
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
                  wallet_address={proposal?.wallet_address}
                  proposalData={proposal}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
};
