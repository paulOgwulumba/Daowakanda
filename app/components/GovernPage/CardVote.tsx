import React, { useEffect, useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Tags } from '../shared';
import styles from './index.module.scss';
import moment from 'moment';
import { DeleteModal } from './deleteModal';
import { useWallet } from '@txnlab/use-wallet';
import { useNotify } from '@/hooks';
import { IProposal, IVote } from '@/interfaces/governance.interface';
import { useGovernanceContract } from '@/features/governance/actions/governance.contract';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { CongratsModal } from './resultsModal';
import { DeclineModal } from './resultsModal/DeclinedModal';
import { useRecoilValue } from 'recoil';
import { VotesAtom } from '@/features/governance/state/governance.atom';

interface CardProps {
  title: string;
  yesVote: any;
  noVote: any;
  tag: string;
  description: string;
  isActive: boolean;
  created_on: string;
  end_time: string;
  id: any;
  setItemDeleted: any;
  proposalData: IProposal;
  wallet_address: string;
}

interface TimeProps {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CardVote({
  title,
  yesVote,
  noVote,
  description,
  isActive,
  created_on,
  end_time,
  id,
  tag,
  setItemDeleted,
  proposalData,
  wallet_address,
}: CardProps) {
  const { activeAddress } = useWallet();
  const { notify } = useNotify();
  const { getAllVotes } = useGovernanceActions();
  const voteInfo = useRecoilValue(VotesAtom);
  const [showdropDown, setShowDropDown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeProps>({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    getAllVotes();
  }, []);

  const { castVoteYes, castVoteNo } = useGovernanceContract();
  const { castVote, getAllProposals } = useGovernanceActions();
  const [showCongratMessage, setShowCongratMessage] = useState(false);
  const [showDeclineMessage, setShowDeclineMessage] = useState(false);

  const totalVotes = Number(yesVote) + Number(noVote);
  const yesPercent = (Number(yesVote) / totalVotes) * 100;
  const noPercent = (Number(noVote) / totalVotes) * 100;

  const toggleDropDown = () => {
    setShowDropDown(!showdropDown);
  };
  const voted = (data: IVote) =>
    data.proposal == id && data.wallet_address == String(activeAddress);
  const resultVote = voteInfo?.some(voted);

  const getRemainingTime = (e: any) => {
    const currentTime: any = new Date();
    const setTarget: any = new Date(e);
    const sumTotal = setTarget - currentTime;
    const total = sumTotal - 3600000;
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / 1000 / 60 / 60 / 24);

    setTimeLeft({
      total,
      days,
      hours,
      minutes,
      seconds,
    });
  };

  useEffect(() => {
    const IntervalId: number = window.setInterval(() => {
      getRemainingTime(end_time);
    }, 1000);

    return () => {
      clearInterval(IntervalId);
    };
  }, [end_time, timeLeft]);

  const toggleClickYes = async () => {
    if (resultVote) {
      notify.error('User has already voted');
      return;
    } else {
      const res = await castVoteYes(proposalData);
      if (res?.error) {
        getAllProposals();
        return;
      }

      const response = await castVote({
        wallet_address: String(activeAddress),
        vote_value: true,
        proposal: id,
      });
      if (response.error) {
        notify.error(response.error?.toString() || 'Network error');
        return;
      }

      notify.success('Vote was successfully recorded');
      getAllVotes();
      getAllProposals();
    }
  };

  const toggleClickNo = async () => {
    if (resultVote) {
      notify.error('User has already voted');
      return;
    } else {
      const res = await castVoteNo(proposalData);
      if (res?.error) {
        getAllProposals();
        return;
      }

      const response = await castVote({
        wallet_address: String(activeAddress),
        vote_value: false,
        proposal: id,
      });

      if (response.error) {
        notify.error(response.error?.toString() || 'Network error');
        return;
      }

      notify.success('Vote was successfully recorded');
      getAllVotes();
      getAllProposals();
    }
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
    console.log(id);
  };
  const clearDeleteModal = () => {
    setDeleteModal(false);
  };
  const clearCongratsModal = () => {
    setShowCongratMessage(false);
  };
  const clearDeclineModal = () => {
    setShowDeclineMessage(false);
  };
  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    const firstSix = address.slice(0, 6);
    const lastSix = address.slice(-6);
    return `${firstSix}...........${lastSix}`;
  };
  const isProposalCreator =
    wallet_address == formatWalletAddress(String(activeAddress));

  const { days, hours, minutes, seconds } = timeLeft;

  const viewCurr = moment().format('YYYY-MM-DD HH:mm:ss');
  const testEndDate = moment.utc(end_time).format('YYYY-MM-DD HH:mm:ss');

  const voteEnded = testEndDate <= viewCurr;
  const showResult = () => {
    if (yesPercent > noPercent) {
      setShowCongratMessage(true);
    } else {
      setShowDeclineMessage(true);
    }
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          isActive={deleteModal}
          onclick={clearDeleteModal}
          setDeleteModal={setDeleteModal}
          setItemDeleted={setItemDeleted}
          id={id}
        />
      )}
      {showCongratMessage && isProposalCreator && (
        <CongratsModal
          isActive={showCongratMessage}
          onclick={clearCongratsModal}
          totalVote={totalVotes}
          title={title}
          yes={yesPercent}
          no={noPercent}
        />
      )}
      {showDeclineMessage && isProposalCreator && (
        <DeclineModal
          isActive={showDeclineMessage}
          onclick={clearDeclineModal}
          totalVote={totalVotes}
          title={title}
          yes={yesPercent}
          no={noPercent}
        />
      )}
      <div
        className={!voteEnded ? styles['cardVote'] : styles['cardAfterVote']}
      >
        <div className={styles['top-content']}>
          <div className={styles['title']}>{title}</div>
          <IoIosArrowDown
            className={styles[showdropDown ? 'icon-active' : 'icon']}
            onClick={toggleDropDown}
          />
        </div>
        {!voteEnded ? (
          <>
            <div className={styles['voteform']}>
              <div className={styles['form']}>
                <div
                  className={styles['overlay']}
                  style={{ width: `${yesPercent}%` }}
                ></div>
                <div className={styles['left']}>
                  {
                    <FaRegCircle
                      className={styles['icon']}
                      onClick={toggleClickYes}
                    />
                  }
                  Yes
                </div>
                <div className={styles['right']}>{`${
                  yesVote <= 0 ? 0 : yesPercent
                }%`}</div>
              </div>

              <div className={styles['form']}>
                <div
                  className={styles['overlay']}
                  style={{ width: `${noPercent}%` }}
                ></div>
                <div className={styles['left']}>
                  {
                    <FaRegCircle
                      className={styles['icon']}
                      onClick={toggleClickNo}
                    />
                  }
                  No
                </div>
                <div className={styles['right']}>{`${
                  noVote <= 0 ? 0 : noPercent
                }%`}</div>
              </div>
            </div>
            <div className={styles['tags-content']}>
              <div className={styles['left']}>No voting power</div>
              <div className={styles['right']}>
                <Tags title={`Tag#${tag}32`} color={'#002E68'} />
                <Tags
                  title={isActive ? 'Active' : 'Not Active'}
                  color={'#A04100'}
                />
                <div className={styles['votingTime']}>
                  Voting ends in:{' '}
                  <Tags
                    title={`${days}days ${hours}h ${minutes}m ${seconds}s`}
                    color={'#003A03'}
                  />
                </div>

                {isProposalCreator && (
                  <div className={styles['delete']} onClick={toggleDeleteModal}>
                    <RiDeleteBin6Line className={styles['icon']} />
                    Delete
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className={styles['bottom-content']}>
            <div className={styles['left']}>
              Ended{` `} {moment.utc(end_time).format('DD MMM, YYYY')}
            </div>
            <div className={styles['right']}>
              <Tags title={tag} color={'#002E68'} />
              <Tags
                title={
                  yesVote == noVote || yesVote < noVote
                    ? `Rejected`
                    : `Approved`
                }
                color={
                  yesVote == noVote || yesVote < noVote ? `#690005` : `#003A03`
                }
              />
              {isProposalCreator && (
                <Tags
                  title={'View Result'}
                  color={'#A04100'}
                  onclick={() => showResult()}
                />
              )}
            </div>
          </div>
        )}

        {showdropDown && (
          <div className={styles['hide-content']}>
            <div className={styles['top']}>
              <div className={styles['body-text']}>{description}</div>
              <div className={styles['vote-card']}>
                <div className={styles['title']}>Vote Information</div>
                <div className={styles['table']}>
                  <div className={styles['row']}>
                    <div className={styles['column']}>Author</div>
                    <div className={styles['column']}>
                      {wallet_address || 'not available'}
                    </div>
                  </div>
                  <div className={styles['row']}>
                    <div className={styles['column']}>Start Date</div>
                    <div className={styles['column']}>
                      {moment.utc(created_on).format('DD MM, YYYY')}
                    </div>
                  </div>
                  <div className={styles['row']}>
                    <div className={styles['column']}>End Date</div>
                    <div className={styles['column']}>
                      {moment.utc(end_time).format('DD MM, YYYY')}
                    </div>
                  </div>
                  <div className={styles['row']}>
                    <div className={styles['column']}>Total Votes</div>
                    <div className={styles['column']}>
                      {Number(yesVote) + Number(noVote)}
                    </div>
                  </div>
                  {/* <div className={styles['row']}>
                    <div className={styles['column']}>Algo Amount</div>
                    <div className={styles['column']}>453,659</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
