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

export function LandingPage() {
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [dropDownActive, setDropDownActive] = useState(false);
  const [dropDownActiveTwo, setDropDownActiveTwo] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

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

  return (
    <div className={styles.container}>
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
                          <div className={styles['tab-item']}>
                            Research forum
                          </div>
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
                    <Link className={styles['nav-item']} href="/about">
                      About
                    </Link>
                    <Link className={styles['nav-item']} href="/faucet">
                      Faucet
                    </Link>
                  </div>
                  <Link
                    className={styles['nav-button']}
                    href={`https://twitter.com/DaoWakanda`}
                  >
                    Join X
                  </Link>
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
            </div>
            <div className={styles['join']}>
              <img
                src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709864873/new-twitter_ptrdzc.png"
                alt="twitter-logo"
              />
              Join X
            </div>
          </div>
        )}
        <div className={styles['lead-section']}>
          <div className={styles['top-section']}>
            <div className={styles['title']}>DaoWakanda</div>
            <div className={styles['body']}>
              This is a decentralized autonomous organization to revolutionize
              community engagement and participation starting with
              algorand Nigeria.
            </div>
            <div className={styles['action-section']}>
              <Link href="/governance" className={styles['btn']}>
                explore proposals
              </Link>

              <div className={styles['watch-video']}>
                <img
                  src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/play-circle_jjnep0.png"
                  alt="play icon"
                />
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
              title="Connect Your Wallet"
              step="Step 1"
              image="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861970/wallet-add-02_zpoze7.png"
              description="Connecting your wallet automatically makes you a member of the community."
            />
            <Card
              title="Claim Wakanda NFT"
              step="Step 2"
              image="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/payment-success-02_yvbygt.png"
              description="To have the right to vote for or against proposals you must possess our WAKANDA NFTs. If you do not have, kindly claim Wakanda NFT."
            />
            <Card
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
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1709953986/frame74_jlrdow.jpg"
              alt="blog-post"
            />
            <div className={styles['card-detail']}>
              <div className={styles['topic']}>
                DaoWakanda-Connect 2023 Recap
              </div>
              <div className={styles['author']}>Author: Micah Tom</div>
              <div className={styles['date']}>December 31 , 2023</div>
            </div>
          </div>
          <div className={styles['cards']}>
            <BlogCard
              image="https://res.cloudinary.com/dlinprg6k/image/upload/v1709953981/frame75_sfgaao.jpg"
              topic="DaoWakanda Monthly Report: November"
              name="admin"
              date="December 31 , 2023"
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
            <a href="https://twitter.com/DaoWakanda">
              <div className={styles['item']}>
                <FaXTwitter className={styles['icon']} /> Twitter
              </div>
            </a>
            <div className={styles['item']}>
              <FaGithub className={styles['icon']} /> Github
            </div>
            <a href="https://t.me/daowakanda">
              <div className={styles['item']}>
                <FaTelegramPlane className={styles['icon']} />
                Telegram
              </div>
            </a>

            <a href="https://medium.com/@daowakanda">
              <div className={styles['item']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710085042/Vector_1_ap98lk.png"
                  alt="blog"
                />
                Blog
              </div>
            </a>
          </div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>Useful links</div>
          <div className={styles['lower-section']}>
              <div className={styles['item']}>Governance</div>
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
