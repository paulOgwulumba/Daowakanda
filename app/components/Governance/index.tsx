import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { FaGithub, FaHistory, FaRegCircle, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsQuestionSquare } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavCard } from './navCard';
import { data, dataTwo } from './mock';
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { Tags } from '../shared';
import { CardAfterVote } from './CardAfterVote';
import { CardVote } from './CardVote';
import { ConnectWalletModal } from './connectModal';

export function GovernancePage() {
    const [activeDropDown, setActiveDropDown] = useState(false);
    const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
    const [openSideNav, setOpenSideNav] = useState(false);
    const [dropDownActive, setDropDownActive] = useState(false);
    const [dropDownActiveTwo, setDropDownActiveTwo] = useState(false);
    const [connectWalletModal, setConnectWalletModal] = useState(false);
    const { width } = useWindowDimensions();
    const isMobile = width ? width < 768 : false;

    const toggleShowDropDown =()=>{
        setDropDownActive(true);
    }

    const toggleHideDropDown =()=>{
        setDropDownActive(false);
    }

    const toggleShowDropDownTwo =()=>{
        setDropDownActiveTwo(true);
    }

    const toggleHideDropDownTwo =()=>{
        setDropDownActiveTwo(false);
    }

    const toggleConnectWallet =()=>{
        setConnectWalletModal(!connectWalletModal);
    }

    return (
        <div className={styles.container}>
            {connectWalletModal && <ConnectWalletModal isActive={connectWalletModal}/>}
            {
                isMobile ? (
                    <div className={styles["mobile-header"]}>
                        <div className={styles["mobile-logo"]}>
                            <Link href={'/'} className={styles["link"]}>
                                <img src='https://res.cloudinary.com/dlinprg6k/image/upload/v1710183598/Group_5_nlkqfr.png' alt='logo' />
                            </Link>
                        </div>
                        <div className={styles["mobile-menu-bar"]} onClick={()=> setOpenSideNav(true)}>
                            <img src='https://res.cloudinary.com/dlinprg6k/image/upload/v1710183576/menu-01_kkbysq.png' alt='bar' />
                        </div>
                        {
                            openSideNav && (
                                <div className={styles["mobile-side-nav"]}>
                                    <header>
                                        <div className={styles["mobile-logo"]}>
                                            <Link href={'/'} className={styles["link"]}>
                                                <img src='https://res.cloudinary.com/dlinprg6k/image/upload/v1710183598/Group_5_nlkqfr.png' alt='logo' />
                                            </Link>
                                        </div>
                                        <div className={styles["mobile-menu-bar"]} onClick={()=> setOpenSideNav(false)}>
                                            <img src='https://res.cloudinary.com/dlinprg6k/image/upload/v1710200265/menu-01_1_btjqaf.png' alt='bar' />
                                        </div>
                                    </header>
                                    <div className={styles["nav-section"]}>
                                        <div className={styles["nav-list"]}>
                                            <div className={styles["section"]}>
                                                <div className={styles["nav-item"]}>Governance 
                                                    {!dropDownActive ? (<IoIosArrowDown onClick={toggleShowDropDown} className={styles["icon"]} />) : (<IoIosArrowUp onClick={toggleHideDropDown} className={styles["icon"]}/>)}
                                                </div>
                                                {
                                                    dropDownActive && (
                                                        <div className={styles["tab"]}>
                                                            <div className={styles["tab-item"]}>Snapshots</div>
                                                            <div className={styles["tab-item"]}>DAO Voting</div>
                                                            <div className={styles["tab-item"]}>Research forum</div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                
                                            <div className={styles["section"]}>
                                                <div className={styles["nav-item"]}>Communities 
                                                    {!dropDownActiveTwo ? (<IoIosArrowDown onClick={toggleShowDropDownTwo} className={styles["icon"]} />) : (<IoIosArrowUp onClick={toggleHideDropDownTwo} className={styles["icon"]}/>)}
                                                </div>
                                                {
                                                    dropDownActiveTwo && (
                                                        <div className={styles["tab"]}>
                                                            <div className={styles["tab-item"]}>Twitter</div>
                                                            <div className={styles["tab-item"]}>Discord</div>
                                                            <div className={styles["tab-item"]}>Telegram</div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className={styles["nav-item"]}> About</div>
                                        </div>
                                        <div className={styles["nav-button"]} onClick={()=>toggleConnectWallet}>
                                            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710656577/wallet-02-1_tjruyq.png" alt="wallet-icon" /> 
                                            Connect Wallet
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                ):(
                    <div className={styles["desktop-header"]}>
                        <Link href={'/'} className={styles["link"]}>
                            <img src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png" alt="logo" />
                        </Link>
                       
                        <div className={styles["nav"]}>
                            <div className={styles["nav-item"]} onMouseEnter={()=>setActiveDropDown(true)}
                                onMouseLeave={()=> setActiveDropDownTwo(false)}>
                                <Link href="/">governance</Link>
                                { activeDropDown && 
                                    <div className={styles["nav-dropdown"]} onMouseLeave={()=> setActiveDropDown(false)}>
                                        {
                                            data.map(item => (
                                                <NavCard
                                                    title={item.title}
                                                    description={item.description}
                                                    link={item.link}
                                                />
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div className={styles["nav-item"]} onMouseEnter={()=>setActiveDropDownTwo(true)}
                                onMouseLeave={()=> setActiveDropDown(false)}>
                                <Link href="/landingpage">communities</Link>
                                { activeDropDownTwo && 
                                    <div className={styles["nav-dropdown"]} onMouseLeave={()=> setActiveDropDownTwo(false)}>
                                    {
                                        dataTwo.map(item => (
                                            <NavCard
                                                title={item.title}
                                                description={item.description}
                                                link={item.link}
                                            />
                                        ))
                                    }
                                </div>
                                }
                            </div>
                            <div className={styles["nav-item"]} onMouseLeave={()=> setActiveDropDownTwo(false)}>
                                <Link href="/">about</Link>
                            </div>
                        </div>
                        <div className={styles["join"]} onClick={()=>toggleConnectWallet()}>
                            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710656577/wallet-02-1_tjruyq.png" alt="wallet-icon" />
                            Connect Wallet
                        </div>
                    </div>
                )
            }
            <div className={styles["hero-section"]}>
                <div className={styles["title"]}>DAO - Participate in decision making</div>
                <div className={styles["body-text"]}>
                    DAO Wakanda is a decentralized autonomous organization, to revolutionize community engagement and participation within Algorand Nigeria. This platform has been designed to create a vibrant ecosystem where contributors and developers are incentivized and rewarded for their invaluable contributions.
                </div>
            </div>{/*Hero-section Ends*/}

            <div className={styles["proposal-section"]}>
                <div className={styles["title-section"]}>
                    <div className={styles["text"]}>Proposals</div>
                    <div className={styles["right-section"]}>
                        <div className={styles["icon-block"]}><FaHistory className={styles["icon"]}/> History</div>
                        <div className={styles["icon-block"]}><IoChatbubblesOutline className={styles["icon"]}/>Forum</div>
                        <div className={styles["icon-block"]}><BsQuestionSquare  className={styles["icon"]}/>FAQ</div>
                        <div className={styles["button"]}><BsQuestionSquare  className={styles["icon"]}/>Create Proposal</div>
                    </div>
                </div>
                <div className={styles["body-section"]}>
                    <div className={styles["form"]}>
                        <div className={styles["input"]}>
                            <input type="text"
                                placeholder='All' 
                            />
                            <IoIosArrowDown className={styles["icon"]}/>
                        </div>
                        <div className={styles["input-search"]}>
                            <input type="text" 
                                placeholder='Search proposals' 
                            />
                            <IoIosSearch className={styles["icon"]}/>
                        </div>
                    </div>
                    <div className={styles["main-section"]}>
                        <CardVote title={'Algorand Hackathon Event in Abuja'} 
                            yesVote={'93.64%'} noVote={'6.36%'}
                        />
                        <CardAfterVote title={'Community Funding'} 
                            date={'Ended 14th Oct, 2023'} tag={'Tag #35'}
                            status={'Approved'} color={'#003A03'}
                        />
                        <CardAfterVote title={'Party at Sharaton'} 
                            date={'Ended 14th Oct, 2023'} tag={'Tag #35'}
                            status={'Rejected'} color={'#690005'}
                        />
                          <CardAfterVote title={'Community Funding'} 
                            date={'Ended 14th Oct, 2023'} tag={'Tag #31'}
                            status={'Approved'} color={'#003A03'}
                        />
                          <CardAfterVote title={'Party at Sharaton'} 
                            date={'Ended 14th Oct, 2023'} tag={'Tag #35'}
                            status={'Rejected'} color={'#690005'}
                        />
                          <CardAfterVote title={'Community Funding'} 
                            date={'Ended 14th Oct, 2023'} tag={'Tag #31'}
                            status={'Approved'} color={'#003A03'}
                        />
                    </div>
                </div>
            </div>{/*Proposal section Ends*/}

            <div className={styles["footer"]}>
                
            </div>{/*Footer Ends*/}

        </div>
    );
}
