'use client';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useWindowDimensions, useNotify } from '@/hooks';
import { useWallet } from '@txnlab/use-wallet-react';
import { useRouter } from 'next/router';
import { ConnectWalletModal } from '../../connectModal';
import Link from 'next/link';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { data, dataTwo } from '../../mock';
import { NavCard } from '../../navCard';
import { VoteModal } from '../../voteModal';
import { IProposalContract } from '@/interfaces/proposal.interface';
import { useProposalActions } from '@/features/governance/actions/proposal.action';
import Skeleton from 'react-loading-skeleton';

export const DetailsPage = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const [proposal, setProposal] = useState<IProposalContract>();
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [voteModalActive, setVoteModalActive] = useState(false);
  const { activeAddress, wallets: providers } = useWallet();
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;
  const { notify } = useNotify();
  const router = useRouter();
  const query = router.query;
  const { getProposalByAppId } = useProposalActions();
  const loading = !proposal;

  const calculatePercentage = () => {
    if (!proposal) {
      return {
        yes: 50,
        no: 50,
      };
    }

    const yesPercentage =
      (100 * proposal.yesVotes.length) /
      (proposal.yesVotes.length + proposal.noVotes.length);
    const finalYesPercentage = isNaN(yesPercentage) ? 50 : yesPercentage;

    return {
      yes: finalYesPercentage,
      no: 100 - finalYesPercentage,
    };
  };

  const toggleConnectWallet = () => {
    setConnectWalletModal(!connectWalletModal);
  };
  const clearConnectModal = () => {
    setConnectWalletModal(false);
  };

  const disconnectWallet = () => {
    providers?.forEach((provider) => provider.disconnect());
  };

  const percentage = calculatePercentage();
  const now = Date.now();

  const connectWalletMessage = () => {
    setTimeout(() => {
      notify.info(`Please Connect Your Wallet`);
    }, 1500);
  };
  /*function to view the vote modal*/
  const openVoteModal = () => {
    if (!activeAddress) {
      notify.error('Please connect your wallet to vote');
      return;
    }
    setVoteModalActive(true);
  };
  const closeVoteModal = () => {
    setVoteModalActive(false);
  };

  const fetchProposal = async () => {
    if (!query.title) return;

    const response = await getProposalByAppId(query.title as string);

    if (response?.appId) {
      setProposal(response);
    }
  };

  useEffect(() => {
    fetchProposal();
  }, [query.title]);

  return (
    <div className={styles.container}>
      {connectWalletModal && (
        <ConnectWalletModal
          isActive={activeAddress ? false : true}
          onclick={clearConnectModal}
        />
      )}
      {voteModalActive && !!proposal && (
        <VoteModal
          proposal={proposal}
          isActive={voteModalActive}
          onclick={closeVoteModal}
          updateProposal={setProposal}
        />
      )}
      {isMobile ? (
        <div className={styles['mobile-header']}>
          <div className={styles['mobile-logo']}>
            <Link href={'/'} className={styles['link']}>
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710183598/Group_5_nlkqfr.png"
                alt="logo"
              />
            </Link>
          </div>
          <div
            className={styles['mobile-menu-bar']}
            onClick={() => setOpenSideNav(true)}
          >
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710183576/menu-01_kkbysq.png"
              alt="bar"
            />
          </div>
          {openSideNav && (
            <div className={styles['mobile-side-nav']}>
              <header>
                <div className={styles['mobile-logo']}>
                  <Link href={'/'} className={styles['link']}>
                    <img
                      src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710183598/Group_5_nlkqfr.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div
                  className={styles['mobile-menu-bar']}
                  onClick={() => setOpenSideNav(false)}
                >
                  <img
                    src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710200265/menu-01_1_btjqaf.png"
                    alt="bar"
                  />
                </div>
              </header>
              <div className={styles['nav-section']}>
                <div
                  className={styles['nav-button']}
                  onMouseEnter={() => {
                    !activeAddress && connectWalletMessage();
                  }}
                  onClick={() => {
                    activeAddress ? disconnectWallet() : toggleConnectWallet();
                    setOpenSideNav(false);
                  }}
                >
                  {activeAddress ? (
                    `${activeAddress.slice(0, 10)}...`
                  ) : (
                    <>
                      <img
                        src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710656577/wallet-02-1_tjruyq.png"
                        alt="wallet-icon"
                      />
                      Connect Wallet
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles['desktop-header']}>
          <Link href={'/'} className={styles['link']}>
            <img
              src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
              alt="logo"
            />
          </Link>
          <div
            className={styles['join']}
            onMouseEnter={() => {
              !activeAddress && connectWalletMessage();
            }}
            onClick={() => {
              activeAddress ? disconnectWallet() : toggleConnectWallet();
            }}
          >
            {activeAddress ? (
              `${activeAddress.slice(0, 10)}...`
            ) : (
              <>
                {/* <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710656577/wallet-02-1_tjruyq.png"
                  alt="wallet-icon"
                /> */}
                Connect Wallet
              </>
            )}
          </div>
        </div>
      )}
      <div className={styles['top-box']}>
        <div className={styles['governance-box']}>
          <p>
            <Link href={`/governance`}>Governance</Link>{' '}
            <span>
              {' '}
              <MdOutlineKeyboardArrowRight />
            </span>{' '}
            {loading ? <Skeleton width={100} /> : proposal.title}{' '}
          </p>
          <h1>
            {loading ? (
              <Skeleton width={150} />
            ) : (
              `#${proposal.appId}: ${proposal.title}`
            )}
          </h1>
          <p>
            {loading ? (
              <Skeleton width={200} count={2} />
            ) : (
              `${proposal.description}`
            )}
          </p>

          {(proposal?.endDate || 0) > now && (
            <button
              className={styles['governance-button']}
              onClick={openVoteModal}
            >
              Proceed to Vote
            </button>
          )}
        </div>

        <div className={styles['main-box']}>
          {/* Results Box */}
          <div className={styles['main-box1']}>
            <div className={styles['main-box1-results']}>
              <div className={styles['results']}>
                <h1>Results</h1>
                <p>
                  {loading ? (
                    <Skeleton width={100} />
                  ) : (
                    `${
                      proposal.yesVotes.length + proposal.noVotes.length
                    } votes`
                  )}
                </p>
              </div>
              <div className={styles['progress-bar']}>
                {proposal ? (
                  <>
                    <div
                      style={{ width: `${percentage.yes}%` }}
                      className={styles['progress-green']}
                    ></div>
                    <div
                      style={{ width: `${percentage.no}%` }}
                      className={styles['progress-red']}
                    ></div>
                  </>
                ) : (
                  <></>
                )}

                {/* <div className={styles['progress-gray']}></div> */}
              </div>

              <div className={styles['results2']}>
                <div className={styles['results-approved']}>
                  <h1></h1>
                  <p>Approved</p>
                </div>
                <p>
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    `${proposal.yesVotes.length} (${percentage.yes}%)`
                  )}
                </p>
              </div>

              <div className={styles['results2']}>
                <div className={styles['results-denied']}>
                  <h1></h1>
                  <p>Denied</p>
                </div>
                <p>
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    `${proposal.noVotes.length} (${percentage.no}%)`
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Creator Box */}
          <div className={styles['main-box2']}>
            <div className={styles['main-box2-details']}>
              <div className={styles['main-box2-created']}>
                <div className={styles['progress-movement']}>
                  <div className={styles['circle']}></div>
                  <div className={styles['dash']}></div>
                </div>
                <div>
                  <h1>Created</h1>
                  <p className={styles['august']}>
                    {loading ? (
                      <Skeleton width={150} />
                    ) : (
                      `${new Date(proposal.startDate).toDateString()}`
                    )}
                  </p>
                </div>
              </div>
              <div className={styles['main-box2-created']}>
                <div className={styles['progress-movement']}>
                  <div className={styles['circle']}></div>
                  <div className={styles['dash']}></div>
                </div>
                <div>
                  <h1>In progress</h1>
                  <p className={styles['august']}>
                    {loading ? (
                      <Skeleton width={150} />
                    ) : (
                      `${new Date(Date.now()).toDateString()}`
                    )}
                  </p>
                </div>
              </div>
              <div className={styles['main-box2-created']}>
                <div className={styles['progress-movement']}>
                  {(proposal?.endDate || 0) < now ? (
                    <div className={styles['circle']}></div>
                  ) : (
                    <div className={styles['circle-point2']}></div>
                  )}
                  <div className={styles['dash-point-end']}></div>
                </div>
                <div>
                  <h1>Ended</h1>
                  <p className={styles['august']}>
                    {loading ? (
                      <Skeleton width={150} />
                    ) : (
                      `${new Date(proposal.endDate).toDateString()}`
                    )}
                  </p>
                </div>
              </div>
              <div className={styles['main-box2-created']}>
                <div className={styles['progress-movement']}>
                  {(proposal?.endDate || 0) < now ? (
                    <div className={styles['circle']}></div>
                  ) : (
                    <div className={styles['circle-point2']}></div>
                  )}
                  <div className={styles['dash-point']}></div>
                </div>
                <h1>Queued</h1>
              </div>
              <div className={styles['main-box2-created']}>
                <div className={styles['progress-movement']}>
                  {(proposal?.endDate || 0) < now ? (
                    <div className={styles['circle']}></div>
                  ) : (
                    <div className={styles['circle-point2']}></div>
                  )}
                </div>
                <h1>Executed</h1>
              </div>
            </div>
          </div>
          {/* Status */}
          <div className={styles['main-box3']}>
            <div className={styles['main-box3-details']}>
              <div className={styles['details']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725949940/status_ueswiq.png"
                  alt="status"
                />
                <h1>
                  Status :{' '}
                  {loading ? (
                    <Skeleton width={50} />
                  ) : (
                    <span
                      style={{
                        color:
                          now < proposal.endDate
                            ? '#FFF'
                            : proposal.yesVotes.length >=
                              proposal.noVotes.length
                            ? undefined
                            : '#FF3B30',
                      }}
                    >
                      {`${
                        now < proposal.endDate
                          ? 'Ongoing'
                          : proposal.yesVotes.length >= proposal.noVotes.length
                          ? 'Approved'
                          : 'Rejected'
                      }`}
                    </span>
                  )}
                </h1>
              </div>
            </div>

            <div className={styles['main-box3-creator']}>
              <div className={styles['creator']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725949940/wallet_2_jyv1qb.png"
                  alt="status"
                />
                <h1>
                  Created By:{' '}
                  {loading ? (
                    <Skeleton width={200} />
                  ) : (
                    `${proposal.creator.slice(0, 10)}...`
                  )}
                </h1>
              </div>
            </div>
            <div className={styles['main-box3-date']}>
              <div className={styles['date']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725949939/calender_gc4kgc.png"
                  alt="status"
                />
                <h1>
                  Start :{' '}
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    `${new Date(proposal.startDate).toDateString()}`
                  )}
                </h1>
              </div>
            </div>

            <div className={styles['main-box3-end']}>
              <div className={styles['end']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725949940/pinpoint_wcisiv.png"
                  alt="status"
                />
                <h1>
                  End :{' '}
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    `${new Date(proposal.endDate).toDateString()}`
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
