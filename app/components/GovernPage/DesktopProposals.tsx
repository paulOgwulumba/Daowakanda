import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { CardVote } from './CardVote';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useRecoilValue } from 'recoil';
import { ProposalsAtom } from '@/features/governance/state/governance.atom';
import { CardVoteLoader } from './CardVoteLoader';
import moment from 'moment';
import { useWallet } from '@txnlab/use-wallet';
import { SampleProposal } from '@/interfaces';
import { proposalsData } from './mock';
import { CardProposal } from './CardProposal';
import { MdOutlineNoteAdd } from 'react-icons/md';
import { ProposalStatus } from '@/enums';

interface MobileProposalProps{
  setCreateProposalModal: any;
}

export const DesktopProposals = ({setCreateProposalModal}:MobileProposalProps) => {
  const [itemDeleted, setItemDeleted] = useState(false);
  const [optionsActive, setOptionsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<ProposalStatus>(ProposalStatus.ALL);
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
      case ProposalStatus.INPROGRESS:
       return proposalList?.filter(item => item.isActive)?.map((item, index) => (
          <CardProposal {...item} key={index} />
        ));
        break;
      case ProposalStatus.APPROVED:
        return proposalList?.filter(item => item.isActive == false && (item.yesVote > item.noVote))?.map((item, index) => (
          <CardProposal {...item} key={index} />
        ));
        break;
      case ProposalStatus.DENIED:
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
    <div className={styles['desktop-proposal-section']}>
      <div className={styles['title-section']}>
        <div className={styles['tabs']}>
          <div className={styles[selected === ProposalStatus.ALL ? 'tab-selected': 'tab']}
            onClick={()=>setSelected(ProposalStatus.ALL)}
          >All</div>
          <div className={styles[selected === ProposalStatus.INPROGRESS ? 'tab-selected': 'tab']}
            onClick={()=>setSelected(ProposalStatus.INPROGRESS)}          
          >In Progress</div>
          <div className={styles[selected === ProposalStatus.APPROVED ? 'tab-selected': 'tab']}
            onClick={()=>setSelected(ProposalStatus.APPROVED)}          
          >Approved</div>
          <div className={styles[selected === ProposalStatus.DENIED ? 'tab-selected': 'tab']}
            onClick={()=>setSelected(ProposalStatus.DENIED)}          
          >Denied</div>
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
            onClick={()=> setCreateProposalModal(true)}
          >
            <MdOutlineNoteAdd className={styles['icon']} />
            Create Proposal
          </button>
        </div>
      </div>
      <div className={styles['main-section']}>
        {
          proposalFilters()
        }
      </div>
    </div>
  );
};
