import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { NavCard } from './navCard';
import { data, dataTwo } from './mock';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { PiDiscordLogo, PiTelegramLogo } from 'react-icons/pi';
import { FiFacebook } from 'react-icons/fi';
import { MdArrowOutward } from 'react-icons/md';

export function AboutPage() {
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [dropDownActive, setDropDownActive] = useState(false);
  const [dropDownActiveTwo, setDropDownActiveTwo] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedTwo, setIsClickedTwo] = useState(false);
  const [isClickedLast, setIsClickedLast] = useState(false);
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
      </div>
      {/*Hero Section Ends*/}
      {!isMobile && <div className={styles['about-us']}></div>}
      {/* About background Image ends */}
      <div className={styles['main-container']}>
        <div className={styles['upper-container']}>
          <div className={styles['top-content']}>
            <div className={styles['title']}>Background</div>
            <div className={styles['desc']}>
              In the evolving digital landscape, community engagement and
              participation have become crucial for the growth and
              sustainability of blockchain ecosystems. DAO Wakanda addresses the
              need for a more inclusive, participatory, and rewarding platform
              starting with Algorand Nigeria.
            </div>
          </div>
          <div className={styles['bottom-content']}>
            <div className={styles['left']}>
              <div className={styles['inner']}>
                <div className={styles['title']}>
                  Designed to revolutionize community engagement starting with
                  Algorand Nigeria ecosystem.
                </div>
                <div className={styles['desc']}>
                  Through innovative use of NFTs, developer incentives,
                  task-based rewards, and community rewards, DAO Wakanda aims to
                  create a vibrant, incentivized environment that empowers
                  community members and amplifies their collective voice.
                </div>
              </div>
              <Link
                className={styles['button']}
                href={'https://t.me/daowakanda'}
                target={'_blank'}
              >
                Become a community member <MdArrowOutward />
              </Link>
            </div>
            <div className={styles['right']}>
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1713641905/Frame_128_k9djem.png"
                alt="pics-about-us"
              />
            </div>
          </div>
        </div>
        <div className={styles['lower-container']}>
          <div className={styles['card']}>
            <div className={styles['title']}>Vision & Goals</div>
            <div className={styles['text']}>
              {`DAO Wakanda's vision is to foster a dynamic and empowered
              community that actively contributes to and benefits from the
              Algorand ecosystem. Its goals include enhancing developer
              engagement, facilitating community-driven decision-making, and
              rewarding contributions through a comprehensive tokenomics model.`}
            </div>
          </div>
          <div className={styles['card']}>
            <div className={styles['title']}>Blockchain Foundation</div>
            <div className={styles['text']}>
              {`DAO Wakanda is built on the Algorand blockchain, known for its speed, security, and scalability. This section will detail the technical architecture, smart contracts, and how NFTs integrate with the DAO.`}
            </div>
          </div>
          <div className={styles['card']}>
            <div className={styles['title']}>Tokenomics</div>
            <div className={styles['inner']}>
              <div className={styles.contain}>
                <div className={styles.title}>
                  $HRT Token Overview
                  <IoIosArrowDown
                    className={!isClicked ? styles.closed : styles.open}
                    onClick={() => {
                      setIsClickedTwo(false);
                      setIsClickedLast(false);
                      setIsClicked(!isClicked);
                    }}
                  />
                </div>
                {isClicked && (
                  <div className={styles.text}>{`
                The $HRT token, with a total supply of 250,000,000, is central to DAO Wakanda's ecosystem. It facilitates governance, rewards, and access to exclusive events and content.
                `}</div>
                )}
              </div>
              <div className={styles.contain}>
                <div className={styles.title}>
                  Distribution
                  <IoIosArrowDown
                    className={!isClickedTwo ? styles.closed : styles.open}
                    onClick={() => {
                      setIsClickedTwo(!isClickedTwo);
                      setIsClickedLast(false);
                      setIsClicked(false);
                    }}
                  />
                </div>
                {isClickedTwo && (
                  <div className={styles.text}>{`
                  Community Reward: 15%, Team:10%
                  Proposal Execution: 25%, Team:5%
                  Funding: 10%, Liquidity/Exchange:10%
                `}</div>
                )}
              </div>
              <div className={styles.contain}>
                <div className={styles.title}>
                  Governance
                  <IoIosArrowDown
                    className={!isClickedLast ? styles.closed : styles.open}
                    onClick={() => {
                      setIsClickedLast(!isClickedLast);
                      setIsClicked(false);
                      setIsClickedTwo(false);
                    }}
                  />
                </div>
                {isClickedLast && (
                  <div className={styles.text}>{`
                  Detail on how $HRT holders can participate in decision-making, including proposing changes and voting on initiatives.
                `}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* main container */}
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
      {/*Footer ends*/}
    </div>
  );
}
