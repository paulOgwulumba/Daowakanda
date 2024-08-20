import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { NavCard } from './navCard';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { ConnectWalletModal } from './connectModal';
import { useWallet } from '@txnlab/use-wallet';
import { useNotify } from '@/hooks';
import { dataOne, dataTwo } from './mock';
import { useFaucetActions } from '@/features/faucet/actions/faucet.action';
import { useRouter } from 'next/router';
import { FaHeart } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import { PiDiscordLogo, PiTelegramLogo } from 'react-icons/pi';
import { FiFacebook } from 'react-icons/fi';

export function FPLPage() {
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [dropDownActive, setDropDownActive] = useState(false);
  const [dropDownActiveTwo, setDropDownActiveTwo] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const { activeAddress, providers } = useWallet();
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;
  const { notify } = useNotify();
  const { registerFaucet } = useFaucetActions();
  const { push } = useRouter();


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
  const disconnectWallet = () => {
    providers?.forEach((provider) => provider.disconnect());
  };

  const connectWalletMessage = () => {
    setTimeout(() => {
      notify.info(`Please Connect Your Wallet`);
    }, 1500);
  };

  const fplData = [
    {
      id: 1,
      position: '🥇1st Position',
      amount: 1000,
    },
    {
      id: 2,
      position: '🥈2nd Position',
      amount: 500,
    },
    {
      id: 3,
      position: '🥉3nd Position',
      amount: 300,
    },
  ]

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
                  <Link className={styles['nav-item']} href="/faucet">
                    Faucet
                  </Link>
                  <Link className={styles['nav-item']} href="/fpl">
                    FPL Tournament
                  </Link>
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
              <Link href="/about">about</Link>
            </div>
            <div
              className={styles['nav-item']}
              onMouseLeave={() => setActiveDropDownTwo(false)}
            >
              <Link href="/faucet">Faucet</Link>
            </div>
            <div
              className={styles['nav-item']}
              onMouseLeave={() => setActiveDropDownTwo(false)}
            >
              <Link href="/fpl">FPL Tournament</Link>
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
      <div className={styles['main']}>
        <div className={styles['fpl-card']}>
          <div className={styles['top']}>
            <div className={styles['title']}>
              Join our FPL League and turn your passion into profits every week.
            </div>
            <div className={styles['steps']}>
              <div className={styles['lead']}>
                Steps:
                <ol>
                  <li>Pick your FPL Squad.</li>
                  <li>Fund your Pera Wallet.</li>
                  <li>Pay a little token of <span>10 Algos</span> to be part of the tournament.</li>
                  <li>Join the Telegram Group that would be sent to you after making payment for further information.</li>
                  <li>Use the League Code that will be provided to join the tournament.</li>
                </ol>
              </div>
            </div>
          </div>
          <div className={styles['bottom']}>
            <div className={styles['grand-prize']}>
              End of season Grand Prize
            </div>
            <div className={styles['prizes']}>
              {
                fplData.map((item, index)=>(
                  <div className={styles['prize']} key={index}>
                    <div className={styles['position']}>
                      {item.position}
                    </div>
                    <div className={styles['amount']}>
                      {item.amount} Algos
                    </div>
                    <div className={styles['addtional']}>
                      {`(OG NFT include)`}
                    </div>
                  </div>
                ))
              }
            </div>
            <div className={styles['btn']}>
              Pay To Join
            </div>
          </div>
        </div>
      </div>

     
      {/*Footer Ends*/}
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
    </div>
  );
}
