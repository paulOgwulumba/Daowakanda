import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useWindowDimensions, useNotify } from '@/hooks';
import { useWallet } from '@txnlab/use-wallet';
import { useRouter } from 'next/router';
import { ConnectWalletModal } from '../../connectModal';
import Link from 'next/link';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { data, dataTwo } from '../../mock';
import { NavCard } from '../../navCard';

export const DetailsPage = () => {
  const [active, setActive] = useState(true);
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
  const toggleConnectWallet = () => {
    setConnectWalletModal(!connectWalletModal);
  };
  const clearConnectModal = () => {
    setConnectWalletModal(false);
  };
  const toggleShowDropDownTwo = () => {
    setDropDownActiveTwo(true);
  };
  const toggleHideDropDownTwo = () => {
    setDropDownActiveTwo(false);
  };

  const disconnectWallet = () => {
    providers?.forEach((provider) => provider.disconnect());
  };

  const connectWalletMessage = () => {
    setTimeout(() => {
      notify.info(`Please Connect Your Wallet`);
    }, 1500);
  };

  return (
    <div className={styles.container}>
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
            Governance{' '}
            <span>
              {' '}
              <MdOutlineKeyboardArrowRight />
            </span>{' '}
            Proposal{' '}
          </p>
          <h1>J4J #1: Supply Reduction Proposal</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Eu facilisi vel auctor diam.
            Hac condimentum eu cursus rhoncus tristique urna malesuada sit. Est
            donec in non massa ultricies pharetra. Nec risus urna odio massa
            aliquam.
          </p>

          <button className={styles['governance-button']}>
            Proceed to Vote
          </button>
        </div>

        <div className={styles['main-box']}>
          {/* Results Box */}
          <div className={styles['main-box1']}>
            <div className={styles['main-box1-results']}>
              <div className={styles['results']}>
                <h1>Results</h1>
                <p>274,033,926 votes</p>
              </div>
              <div className={styles['progress-bar']}>
                <div className={styles['progress-green']}></div>
                <div className={styles['progress-gray']}></div>
                <div className={styles['progress-red']}></div>
              </div>

              <div className={styles['results2']}>
                <div className={styles['results-approved']}>
                  <h1></h1>
                  <p>Approved</p>
                </div>
                <p>260,131,475 (95%)</p>
              </div>
              <div className={styles['results2']}>
                <div className={styles['results-maybe']}>
                  <h1></h1>
                  <p>Maybe</p>
                </div>
                <p>9,382,737 (3%)</p>
              </div>
              <div className={styles['results2']}>
                <div className={styles['results-denied']}>
                  <h1></h1>
                  <p>Denied</p>
                </div>
                <p>4,519,713 (2%)</p>
              </div>
            </div>
          </div>

          {/* Creator Box */}
          <div className={styles['main-box2']}>
            <h1>Created</h1>
          </div>
          <div className={styles['main-box3']}>
            <div className={styles['main-box3-details']}>
              <div className={styles['details']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725949940/status_ueswiq.png"
                  alt="status"
                />
                <h1>
                  Status : <span>Approved</span>
                </h1>
              </div>
            </div>

            <div className={styles['main-box3-creator']}>
              <div className={styles['creator']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725949940/wallet_2_jyv1qb.png"
                  alt="status"
                />
                <h1>Created By : DLvz...qcWL</h1>
              </div>
            </div>
            <div className={styles['main-box3-date']}>
              <div className={styles['date']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725949939/calender_gc4kgc.png"
                  alt="status"
                />
                <h1>Start : 01 August 2024, 16.16 PM</h1>
              </div>
            </div>

            <div className={styles['main-box3-end']}>
              <div className={styles['end']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725949940/pinpoint_wcisiv.png"
                  alt="status"
                />
                <h1>End : 04 August 2024, 16.16 PM</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
