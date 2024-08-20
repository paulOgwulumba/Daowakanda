import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useState } from 'react';
import styles from './index.module.scss';
import { Card } from './card';
import { CommunityCard } from './communityCard';
import { BlogCard } from './blogCard';
import { FaGithub, FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { NavCard } from './navCard';
import { data, dataTwo } from './mock';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Link from 'next/link';
import { ConnectWalletModal } from './connectModal';
import { useWallet } from '@txnlab/use-wallet';
import { useNotify } from '@/hooks';
import { useRouter } from 'next/router';

export function LandingPage() {
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [dropDownActive, setDropDownActive] = useState(false);
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [dropDownActiveTwo, setDropDownActiveTwo] = useState(false);
  const { width } = useWindowDimensions();
  const { activeAddress, providers } = useWallet();
  const isMobile = width ? width < 768 : false;
  const { notify } = useNotify();
  const router = useRouter();

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
  const toggleConnectWallet = () => {
    setConnectWalletModal(!connectWalletModal);
  };

  return (
    <div className={styles.container}>
      {connectWalletModal && (
        <ConnectWalletModal
          isActive={activeAddress ? false : true}
          onclick={clearConnectModal}
        />
      )}
      <div className={styles['hero-section']}>
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
                      activeAddress
                        ? disconnectWallet()
                        : toggleConnectWallet();
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
            <img
              src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
              alt="logo"
            />
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
                    {data.map((item, index) => (
                      <NavCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        link={item.link}
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
                        key={index}
                        title={item.title}
                        description={item.description}
                        link={item.link}
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
        <div className={styles['lead-section']}>
          <div className={styles['top-section']}>
            <div className={styles['title']}>DaoWakanda</div>
            <div className={styles['body']}>
              This is a decentralized autonomous organization to revolutionize
              community engagement and participation starting with
              Algorand Nigeria.
            </div>
            <div className={styles['action-section']}>
              <Link href="/governance" className={styles['btn']}>
                explore proposals
              </Link>

              <div className={styles['watch-video']}>
                <Link href="https://www.youtube.com/@DaoWakanda">
                  <img
                    src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/play-circle_jjnep0.png"
                    alt="play icon"
                  />
                </Link>
                Watch Video
              </div>
            </div>
          </div>
          {/* <div className={styles['bottom-section']}>
            <div className={styles['stats']}>
              2943
              <div className={styles['task']}>
                <div>Active</div>
                <div>Projects</div>
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Line_o6byny.png"
              alt="icon"
            />
            <div className={styles['stats']}>
              $1M+
              <div className={styles['task']}>
                <div>Community</div>
                <div>Members</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/*Hero Section Ends*/}
      <div className={styles['how-section']}>
        <div className={styles['text-lead']}>How it works</div>
        <div className={styles['body']}>
          <div className={styles['top']}>
            <div className={styles['top-card']}>
              <div>Step 1</div>
              <img
                src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861970/wallet-add-02_zpoze7.png"
                alt="icon"
              />
            </div>
            <div className={styles['top-card']}>
              <div>Step 2</div>
              <img
                src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/payment-success-02_yvbygt.png"
                alt="icon"
              />
            </div>
            <div className={styles['top-card']}>
              <div>Step 3</div>
              <img
                src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861972/blockchain-07_ipjgzd.png"
                alt="icon"
              />
            </div>
          </div>
          <div className={styles['bottom']}>
            <Card
              onclick={() => setConnectWalletModal(true)}
              title="Connect Your Wallet"
              step="Step 1"
              image="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861970/wallet-add-02_zpoze7.png"
              description="Connecting your wallet automatically makes you a member of the community."
            />

            <Card
              onclick={() => router.push('/faucet')}
              title="Claim Wakanda NFT"
              step="Step 2"
              image="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/payment-success-02_yvbygt.png"
              description="To have the right to vote for or against proposals you must possess our WAKANDA NFTs. If you do not have, kindly claim Wakanda NFT."
            />

            <Card
              onclick={() => router.push('/governance')}
              title="Vote"
              step="Step 3"
              image="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861972/blockchain-07_ipjgzd.png"
              description="You may now vote during proposals. Your voice matters in the community. Your are one of us, vote wisely."
            />
          </div>
        </div>
      </div>
      {/*How it works Ends*/}
      <div className={styles['blog-section']}>
        <div className={styles['lead']}>
          <div className={styles['title']}>From our blog</div>
          <div className={styles['desc']}>
            Learn more about DaoWakanda, Algorand Nigeria community
          </div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles['special-card']}>
            <Link
              href="https://medium.com/@daowakanda/introducing-the-daowakanda-testnet-claim-your-free-nft-and-engage-in-governance-682156156d2e"
              target="blank"
            >
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1720618394/faucetImage_f5szql.webp"
                alt="blog-post"
              />
              <div className={styles['card-detail']}>
                <div className={styles['topic']}>
                  Introducing the DaoWakanda Testnet: Claim Your Free NFT and
                  Engage in Governance
                </div>
                <div className={styles['author']}>Author: Daowakanda</div>
                <div className={styles['date']}>July 10 , 2024</div>
              </div>
            </Link>
          </div>
          <div className={styles['cards']}>
            <BlogCard
              image="https://res.cloudinary.com/dlinprg6k/image/upload/v1709953978/wakanda-warrior_ofvi8k.jpg"
              topic="Daowakanda: Pioneering Community Engagement and Participation on the Algorand Blockchain"
              name="Daowakanda"
              date="July 09, 2024"
            />
            <BlogCard
              image="https://res.cloudinary.com/dlinprg6k/image/upload/v1709953981/frame76_hdefkt.jpg"
              topic="NFT Launch"
              name="micah tom"
              date="December 31 , 2023"
            />
            <BlogCard
              image="https://res.cloudinary.com/dlinprg6k/image/upload/v1709953979/Frame77_kazdet.png"
              topic="Game night"
              name="micah tom"
              date="December 31 , 2023"
            />
          </div>
        </div>
      </div>
      {/*Blog Section Ends*/}
      <div className={styles['join-community']}>
        <div className={styles['lead']}>
          <div className={styles['title']}>Join Our Community</div>
          <div className={styles['desc']}>
            Be part of the community and have a say in the future of the
            Algorand Nigeria community
          </div>
        </div>
        <div className={styles['cards']}>
          <CommunityCard
            image="https://res.cloudinary.com/dlinprg6k/image/upload/v1710000419/Group_2_jw5ujw.png"
            topic="Telegram"
            text="Join chat"
            address="https://t.me/daowakanda"
          />
          <CommunityCard
            image="https://res.cloudinary.com/dlinprg6k/image/upload/v1710000217/X_-_jpeg_1_v21qzs.png"
            topic="X"
            text="Follow us"
            address="https://twitter.com/DaoWakanda"
          />
          <CommunityCard
            image="https://res.cloudinary.com/dlinprg6k/image/upload/v1710000290/Github_svg_1_fmlif0.png"
            topic="Github"
            text="Follow us"
            address="https://github.com/digichains/wakandaV3"
          />
          <CommunityCard
            image="https://res.cloudinary.com/dlinprg6k/image/upload/v1710000327/Group_1_ni3ph6.png"
            topic="Contact us"
            text="Get in touch"
            address="daowakanda@gmail.com"
          />
          <CommunityCard
            image="https://res.cloudinary.com/dlinprg6k/image/upload/v1710000417/Artboard_ieakek.png"
            topic="Blog"
            text="Learn about Daowakanda"
            address="https://medium.com/@daowakanda"
          />
        </div>
      </div>
      {/*Join Community Section Ends*/}
      <div className={styles['subscribe']}>
        <div className={styles['lead']}>
          <div className={styles['title']}>Subscribe to our mailing list</div>
          <div className={styles['desc']}>
            Stay up to date with Algorand projects developments
          </div>
        </div>
        <div className={styles['form']}>
          <input type="text" placeholder="Email address" />
          <button>Subscribe</button>
        </div>
      </div>
      {/*Subscribe ends*/}
      <div className={styles['notify']}>
        <div className={styles['telegram-box']}>
          <FaTelegramPlane className={styles['telegram']} />
        </div>
        <div className={styles['lead']}>
          <div className={styles['title']}>Governance notification bot</div>
          <div className={styles['desc']}>
            Stay up to speed with DaoWakanda governance developments
          </div>
        </div>
        <div className={styles['notify-button']}>Get notified</div>
      </div>
      {/*Notify ends*/}
      <div className={styles['footer']}>
        <div className={styles['card']}>
          <div className={styles['title']}>DaoWakanda Communities</div>
          <div className={styles['lower-section']}>
            <Link
              href="https://twitter.com/DaoWakanda"
              className={styles['item']}
              target="_blank"
            >
              <FaXTwitter className={styles['icon']} /> Twitter
            </Link>
            <Link
              href={'https://github.com/digichains/wakandaV3'}
              className={styles['item']}
              target="_blank"
            >
              <FaGithub className={styles['icon']} /> Github
            </Link>
            <Link
              href="https://t.me/daowakanda"
              className={styles['item']}
              target="_blank"
            >
              <FaTelegramPlane className={styles['icon']} />
              Telegram
            </Link>

            <Link
              href="https://medium.com/@daowakanda"
              target="_blank"
              className={styles['item']}
            >
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710085042/Vector_1_ap98lk.png"
                alt="blog"
              />
              Blog
            </Link>
          </div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>Useful links</div>
          <div className={styles['lower-section']}>
            <Link href="/governance" className={styles['item']}>
              Governance
            </Link>
            <div className={styles['item']}>DAO Voting</div>
            <div className={styles['item']}>Documentation</div>
            <div className={styles['item']}>Research Forum</div>
          </div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>About Us</div>
          <div className={styles['lower-section']}>
            <div className={styles['item']}>FAQs</div>
            <div className={styles['item']}>Help Center</div>
            <div className={styles['item']}>Download Dev. Kit</div>
            <div className={styles['item']}>Blog</div>
          </div>
        </div>
      </div>
      {/*Footer ends*/}
    </div>
  );
}
