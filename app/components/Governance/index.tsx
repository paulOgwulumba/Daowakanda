import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { PiDiscordLogo, PiTelegramLogo } from 'react-icons/pi';
import { FaHeart, FaHistory } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { BsQuestionSquare } from 'react-icons/bs';
import { RiTwitterXLine } from 'react-icons/ri';
import { NavCard } from './navCard';
import { dataOne, dataTwo } from './mock';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { ConnectWalletModal } from './connectModal';
import { CreateProposalModal } from './createProposal';
import { useWallet } from '@txnlab/use-wallet';
import { Proposals } from './Proposals';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useRecoilState } from 'recoil';
import { ProposalsAtom } from '@/features/governance/state/governance.atom';
import { useNotify } from '@/hooks';

export function GovernancePage() {
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [dropDownActive, setDropDownActive] = useState(false);
  const [dropDownActiveTwo, setDropDownActiveTwo] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [createProposalModal, setCreateProposalModal] = useState(false);
  const { activeAddress, providers } = useWallet();
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;
  const { notify } = useNotify();

  const [proposalData] = useRecoilState(ProposalsAtom);
  const { getAllProposals } = useGovernanceActions();

  const toggleShowDropDown = () => {
    setDropDownActive(true);
  };
  const toggleHideDropDown = () => {
    setDropDownActive(false);
  };
  const toggleShowDropDownTwo = () => {
    setDropDownActiveTwo(true);
  };
  const toggleHideDropDownTwo = () => {
    setDropDownActiveTwo(false);
  };
  const toggleConnectWallet = () => {
    setConnectWalletModal(!connectWalletModal);
  };
  const clearConnectModal = () => {
    setConnectWalletModal(false);
  };
  const openProposalModal = () => {
    setCreateProposalModal(true);
  };
  const clearCreateProposalModal = () => {
    setCreateProposalModal(false);
  };
  const disconnectWallet = () => {
    providers?.forEach((provider) => provider.disconnect());
  };

  const connectWalletMessage = () => {
    setTimeout(() => {
      notify.info(`Please Connect Your Wallet`);
    }, 1500);
  };

  useEffect(() => {
    getAllProposals();
  }, []);

  console.log(proposalData);
  return (
    <div className={styles.container}>
      {/* {congratsModal && <DeclineModal isActive={congratsModal} onclick={clearCongratsModal} />} */}
      {createProposalModal && (
        <CreateProposalModal
          isActive={createProposalModal}
          onclick={clearCreateProposalModal}
          setCreateProposalModal={setCreateProposalModal}
        />
      )}
      {connectWalletModal && (
        <ConnectWalletModal
          isActive={activeAddress ? false : true}
          onclick={clearConnectModal}
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
                <div className={styles['nav-list']}>
                  <div className={styles['section']}>
                    <div className={styles['nav-item']}>
                      Governance
                      {!dropDownActive ? (
                        <IoIosArrowDown
                          onClick={toggleShowDropDown}
                          className={styles['icon']}
                        />
                      ) : (
                        <IoIosArrowUp
                          onClick={toggleHideDropDown}
                          className={styles['icon']}
                        />
                      )}
                    </div>
                    {dropDownActive && (
                      <div className={styles['tab']}>
                        <div className={styles['tab-item']}>Snapshots</div>
                        <div className={styles['tab-item']}>DAO Voting</div>
                        <div className={styles['tab-item']}>Research forum</div>
                      </div>
                    )}
                  </div>

                  <div className={styles['section']}>
                    <div className={styles['nav-item']}>
                      Communities
                      {!dropDownActiveTwo ? (
                        <IoIosArrowDown
                          onClick={toggleShowDropDownTwo}
                          className={styles['icon']}
                        />
                      ) : (
                        <IoIosArrowUp
                          onClick={toggleHideDropDownTwo}
                          className={styles['icon']}
                        />
                      )}
                    </div>
                    {dropDownActiveTwo && (
                      <div className={styles['tab']}>
                        <div className={styles['tab-item']}>Twitter</div>
                        <div className={styles['tab-item']}>Discord</div>
                        <div className={styles['tab-item']}>Telegram</div>
                      </div>
                    )}
                  </div>
                  <div className={styles['nav-item']}> About</div>

                  <Link className={styles['nav-item']} href="/faucet">
                    Faucet
                  </Link>
                </div>
                <div
                  className={styles['nav-button']}
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

          <div className={styles['nav']}>
            <div
              className={styles['nav-item']}
              onMouseEnter={() => setActiveDropDown(true)}
              onMouseLeave={() => setActiveDropDownTwo(false)}
            >
              <Link href="/">governance</Link>
              {activeDropDown && (
                <div
                  className={styles['nav-dropdown']}
                  onMouseLeave={() => setActiveDropDown(false)}
                >
                  {dataOne.map((item, index) => (
                    <NavCard
                      title={item.title}
                      description={item.description}
                      link={item.link}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </div>
            <div
              className={styles['nav-item']}
              onMouseEnter={() => setActiveDropDownTwo(true)}
              onMouseLeave={() => setActiveDropDown(false)}
            >
              <Link href="/landingpage">communities</Link>
              {activeDropDownTwo && (
                <div
                  className={styles['nav-dropdown']}
                  onMouseLeave={() => setActiveDropDownTwo(false)}
                >
                  {dataTwo.map((item, index) => (
                    <NavCard
                      title={item.title}
                      description={item.description}
                      link={item.link}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </div>
            <div
              className={styles['nav-item']}
              onMouseLeave={() => setActiveDropDownTwo(false)}
            >
              <Link href="/">about</Link>
            </div>
            <div
              className={styles['nav-item']}
              onMouseLeave={() => setActiveDropDownTwo(false)}
            >
              <Link href="/faucet">Faucet</Link>
            </div>
          </div>
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
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710656577/wallet-02-1_tjruyq.png"
                  alt="wallet-icon"
                />
                Connect Wallet
              </>
            )}
          </div>
        </div>
      )}
      <div className={styles['hero-section']}>
        <div className={styles['title']}>
          DAO - Participate in decision making
        </div>
        <div className={styles['body-text']}>
          DAO Wakanda is a decentralized autonomous organization, to
          revolutionize community engagement and participation within Algorand
          Nigeria. This platform has been designed to create a vibrant ecosystem
          where contributors and developers are incentivized and rewarded for
          their invaluable contributions.
        </div>
      </div>
      {/*Hero-section Ends*/}

      <div className={styles['proposal-section']}>
        <div className={styles['title-section']}>
          <div className={styles['text']}>Proposals</div>
          <div className={styles['right-section']}>
            <div className={styles['icon-block']}>
              <FaHistory className={styles['icon']} /> History
            </div>
            <div className={styles['icon-block']}>
              <IoChatbubblesOutline className={styles['icon']} />
              Forum
            </div>
            <div className={styles['icon-block']}>
              <BsQuestionSquare className={styles['icon']} />
              FAQ
            </div>
            <button
              className={styles['button']}
              disabled={activeAddress ? false : true}
              onClick={openProposalModal}
            >
              <BsQuestionSquare className={styles['icon']} />
              Create Proposal
            </button>
          </div>
        </div>
        <Proposals />
      </div>
      {/*Proposal section Ends*/}

      <div className={styles['footer']}>
        <div className={styles['contain']}>
          <div className={styles['left']}>
            Buit with <FaHeart className={styles['icon']} /> at{' '}
            <div className={styles['dao']}>DAO WAKANDA</div>
          </div>
          <div className={styles['right']}>
            <RiTwitterXLine className={styles['icon']} />
            <PiTelegramLogo className={styles['icon']} />
            <PiDiscordLogo className={styles['icon']} />
            <FiFacebook className={styles['icon']} />
          </div>
        </div>
      </div>
      {/*Footer Ends*/}
    </div>
  );
}
