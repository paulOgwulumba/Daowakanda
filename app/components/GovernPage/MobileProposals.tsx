import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { CardVote } from './CardVote';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useRecoilValue } from 'recoil';
import { ProposalsAtom } from '@/features/governance/state/governance.atom';
import { CardVoteLoader } from './CardVoteLoader';
import moment from 'moment';
import { MdOutlineNoteAdd } from 'react-icons/md';
import { useWallet } from '@txnlab/use-wallet';
import { SampleProposal } from '@/interfaces';
import { proposalsData } from './mock';
import { CardProposal } from './CardProposal';

interface MobileProposalProps{
  openProposalModal: any;
}

export const MobileProposals = ({openProposalModal}:MobileProposalProps) => {
  const [itemDeleted, setItemDeleted] = useState(false);
  const [optionsActive, setOptionsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { getAllProposals } = useGovernanceActions();
  const proposals = useRecoilValue(ProposalsAtom);
  const { activeAddress, providers } = useWallet();
  const [proposalList, setProposalList] = useState<SampleProposal[]>(proposalsData);

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

  const proposalFilters = () =>{
    switch (selected){
      case 'In Progress':
       return proposalList?.filter(item => item.isActive)?.map((item, index) => (
          <CardProposal {...item} key={index} />
        ));
        break;
      case 'Approved':
        return proposalList?.filter(item => item.isActive == false && (item.yesVote > item.noVote))?.map((item, index) => (
          <CardProposal {...item} key={index} />
        ));
        break;
      case 'Denied':
      return proposalList?.filter(item => item.isActive == false && (item.yesVote <= item.noVote))?.map((item, index) => (
        <CardProposal {...item} key={index} />
      ));
      break;
      default:
        return proposalList?.map((item, index) => (
          <CardProposal {...item} key={index} />
        ));
    }

  }

  return (
    <div className={styles['mobile-proposal-section']}>
      <div className={styles['title-section']}>
        <div className={styles['filter-container']}>
          <div className={styles['selected']}>
            {selected}
            <IoIosArrowDown
              className={styles['icon']}
              onClick={() => setOptionsActive(!optionsActive)}
            />
          </div>
        </div>

        <div className={styles['right-section']}>
          <div className={styles['input-search']}>
            <input
              type="text"
              placeholder="Search proposals"
              name={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className={styles['icon']} />
          </div>
          <button
            className={styles['button']}
            disabled={activeAddress ? false : true}
            onClick={()=> openProposalModal}
          >
            <MdOutlineNoteAdd className={styles['icon']} />
          </button>
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
                setSelected('In Progress');
                setOptionsActive(false);
              }}
            >
              In Progress
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
            <div
              className={styles['option']}
              onClick={() => {
                setSelected('Denied');
                setOptionsActive(false);
              }}
            >
              Denied
            </div>
          </div>
        )}
      </div>
      <div className={styles['main-section']}>
        {
          proposalFilters()
        }
      </div>
    </div>
  );
};
