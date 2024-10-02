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
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { ConnectWalletModal } from './connectModal';
import { CreateProposalModal } from './createProposal';
import { useWallet } from '@txnlab/use-wallet';
import { DesktopProposals } from './DesktopProposals';
import { useGovernanceActions } from '@/features/governance/actions/governance.action';
import { useRecoilState } from 'recoil';
import { ProposalsAtom } from '@/features/governance/state/governance.atom';
import { useNotify } from '@/hooks';
import { MdOutlineNoteAdd } from 'react-icons/md';
import { data, dataTwo } from './mock';
import { useRouter } from 'next/router';
import { MobileProposals } from './MobileProposals';
import { PaginationBar } from './SubComponent/PaginationBar';

export function GovernPage() {
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
  const router = useRouter();

  // Get the full current URL
  const currentUrl = `${router.asPath}`;
  console.log(currentUrl);
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
                  <Link className={styles['nav-item']} href="/governance">
                    Governance
                  </Link>

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
                  <Link className={styles['nav-item']} href="/about">
                    About
                  </Link>

                  {/* <Link className={styles['nav-item']} href="/faucet">
                    Faucet
                  </Link> */}
                  {/* <Link className={styles['nav-item']} href="/fpl">
                    FPL Tournament
                  </Link> */}
                </div>
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

          <div className={styles['nav']}>
            <div
              className={styles['nav-item']}
              onMouseEnter={() => setActiveDropDown(true)}
              onMouseLeave={() => setActiveDropDownTwo(false)}
            >
              <Link
                href="/governance"
                style={{
                  color: currentUrl == `/governance` ? `#fff` : `#757575`,
                }}
              >
                governance
              </Link>
              {activeDropDown && (
                <div
                  className={styles['nav-dropdown']}
                  onMouseLeave={() => setActiveDropDown(false)}
                >
                  {data.map((item, index) => (
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
              <Link
                href="/landingpage"
                style={{
                  color: currentUrl == `/landingpage` ? `#fff` : `#757575`,
                }}
              >
                communities
              </Link>
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
              <Link
                href="/about"
                style={{ color: currentUrl == `/about` ? `#fff` : `#757575` }}
              >
                about
              </Link>
            </div>
            {/* <div
              className={styles['nav-item']}
              onMouseLeave={() => setActiveDropDownTwo(false)}
            >
              <Link
                href="/faucet"
                style={{ color: currentUrl == `/faucet` ? `#fff` : `#757575` }}
              >
                Faucet
              </Link>
            </div> */}
            {/* <div
              className={styles['nav-item']}
              onMouseLeave={() => setActiveDropDownTwo(false)}
            >
              <Link
                href="/fpl"
                style={{ color: currentUrl == `/fpl` ? `#fff` : `#757575` }}
              >
                FPL Tournament
              </Link>
            </div> */}
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
      <div className={styles['hero-section']}>
        <div className={styles['inner-content']}>
          <div className={styles['title']}>DaoWakanda Governance:</div>
          <div className={styles['bold-text']}>
            Participate in decision making
          </div>
        </div>
        <div className={styles['body-text']}>
          Focused on revolutionizing community engagement and participation
          starting with Algorand Nigeria.
        </div>
      </div>
      {/*Hero-section Ends*/}

      {isMobile ? (
        <MobileProposals openProposalModal={openProposalModal} />
      ) : (
        <DesktopProposals setCreateProposalModal={setCreateProposalModal} />
      )}
      {/*Proposal section Ends*/}

      <PaginationBar />

      {/*Pagination section Ends*/}

      <div className={styles['footer']}>
        <div className={styles['contain']}>
          <div className={styles['left']}>
            Buit with <FaHeart className={styles['icon']} /> at{' '}
            <div className={styles['dao']}>DAO WAKANDA</div>
          </div>
          <div className={styles['right']}>
            <Link href="https://twitter.com/DaoWakanda" target={'_blank'}>
              <RiTwitterXLine className={styles['icon']} />
            </Link>
            <Link href="https://t.me/daowakanda" target={'_blank'}>
              <PiTelegramLogo className={styles['icon']} />
            </Link>
            <PiDiscordLogo className={styles['icon']} />
            <FiFacebook className={styles['icon']} />
          </div>
        </div>
      </div>
      {/*Footer Ends*/}
    </div>
  );
}
