import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { PiDiscordLogo, PiTelegramLogo } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { RiArrowRightSLine, RiTwitterXLine } from 'react-icons/ri';
import { NavCard } from './navCard';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { ConnectWalletModal } from './connectModal';
import { useWallet } from '@txnlab/use-wallet';
import { useNotify } from '@/hooks';
import { ClaimNftModal } from './connectModal/claimNft';
import { dataOne, dataTwo } from './mock';
import { useFaucetActions } from '@/features/faucet/actions/faucet.action';
import { ThreeDots } from 'react-loader-spinner';

export function FaucetPage() {
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

  // State variables to store values of input fields
  const [telegramUsername, setTelegramUsername] = useState('');
  const [telegramFirstName, setTelegramFirstName] = useState('');
  const [telegramLastName, setTelegramLastName] = useState('');

  //check claim nft modal state
  const [claimNftPopUp, setClaimNftPopUp] = useState(false);
  const [timing, setTiming] = useState(0);

  useEffect(() => {
    if (timing > 0) {
      const intervalId = setInterval(() => {
        setTiming((timing) => timing - 1);
      }, 1000);

      // Clear the interval on component unmount
      return () => clearInterval(intervalId);
    }
    if (timing <= 0) {
      setClaimNftPopUp(false);
    }
  }, [timing]);

  // State variable to store clipboard text
  const [clipboardText, setClipboardText] = useState('');

  // Function to handle paste button click
  const handlePasteButtonClick = (fieldName: string) => {
    // Attempt to read text from the clipboard
    navigator.clipboard
      .readText()
      .then((text) => {
        // Set the clipboard text to state
        setClipboardText(text);
        // Set the clipboard text to the specified field
        setFieldValue(fieldName, text);
      })
      .catch((error) => {
        console.error('Failed to read from clipboard:', error);
      });
  };

  // Function to update the value of the specified field
  const setFieldValue = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'username':
        setTelegramUsername(value);
        break;
      case 'firstname':
        setTelegramFirstName(value);
        break;
      case 'lastname':
        setTelegramLastName(value);
        break;
      default:
        console.error('Invalid field name:', fieldName);
    }
  };

  // Function to handle button click
  const handleClaimNFT = async () => {
    // Check if all tasks are completed
    setLoading(true);
    if (telegramUsername && telegramFirstName && telegramLastName) {
      // Perform NFT claiming logic
      const res = await registerFaucet({
        telegram_username: telegramUsername,
        telegram_first_name: telegramFirstName,
        telegram_last_name: telegramLastName,
      });

      if (res.error) {
        notify.error(res.error?.toString() || 'Network error');
        setLoading(false);
        return;
      }

      notify.success('Faucet Details successfully registered');
      setLoading(false);
      setClaimNftPopUp(true);
      setTiming(35);
      setTelegramUsername('');
      setTelegramFirstName('');
      setTelegramLastName('');
      console.log('Claiming NFT...');
    } else {
      // Tasks are not completed, do nothing or show a message
      notify.error('Please complete all tasks before claiming NFT.');
    }
  };

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    const firstThirteen = address.slice(0, 13);
    const lastSix = address.slice(-6);
    return `${firstThirteen}...........${lastSix}`;
  };

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

  return (
    <div className={styles.container}>
      {connectWalletModal && (
        <ConnectWalletModal
          isActive={activeAddress ? false : true}
          onclick={clearConnectModal}
        />
      )}
      {claimNftPopUp && (
        <ClaimNftModal
          isActive={claimNftPopUp}
          onclick={() => setClaimNftPopUp(false)}
          timing={timing}
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
        <div className="w-full m-2">
          <div className="flex justify-center items-center m-2">
            <div>
              <h1 className="text-2xl font-bold m-5 text-[#4EE248]">
                Claim FREE TestNet NFT
              </h1>
              <hr className="bg-gray-100 border-0 h-px my-4" />
            </div>
          </div>
          <div className="w-[100%] m-2 flex justify-center items-center md:w-full md:flex md:justify-center md:items-center text-gray-300">
            <p className="w-[90%] text-center md:w-full md:flex md:justify-center md:items-center">
              Obtain Wakanda NFT to participate in governance and proposals
            </p>
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <div className="w-[100%] m-5 bg-[#333333] md:w-[50%] md:p-5 border border-white rounded-2xl ">
            <h1 className="text-[13px] m-5 md:m-0 md:text-[#FFF] md:text-[18px]">
              Complete the tasks below:
            </h1>
            <div className="m-5 md:m-0 text-[#d8d8d8d0]">
              <div className="mb-5">
                <div className="flex">
                  <label className="block m-2 text-sm font-medium text-white">
                    {' '}
                    1.{' '}
                  </label>
                  <p className="m-2 text-sm">
                    Join our Telegram group{' '}
                    <Link href="https://t.me/daowakanda">
                      <span className="text-[#68BBE3] cursor-pointer">
                        @daoWakanda
                      </span>
                    </Link>{' '}
                    and input your username below :
                  </p>
                </div>
                <div className="ml-7 flex bg-[#000] rounded-md text-sm">
                  <input
                    type="text"
                    name="telegram_username"
                    placeholder="Enter telegram username (e.g @userexample)"
                    className=" p-2 md:p-2 pr-10 block w-[90%] shadow-sm sm:text-sm bg-[#4D4D4D] rounded-md"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)} // Update state when input changes
                  />
                  <button
                    className="m-3 text-[12px]"
                    onClick={() => handlePasteButtonClick('username')}
                  >
                    Paste
                  </button>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex">
                  <label className="block m-2 text-sm font-medium text-white">
                    2.
                  </label>
                  <p className="m-2 text-sm">
                    Join our Telegram group{' '}
                    <Link href="https://t.me/daowakanda">
                      <span className="text-[#68BBE3] cursor-pointer">
                        @daoWakanda
                      </span>
                    </Link>{' '}
                    and input your first name below :
                  </p>
                </div>
                <div className="ml-7 flex bg-[#000] rounded-md text-sm">
                  <input
                    type="text"
                    name="telegram_first_name"
                    placeholder="Enter telegram firstname (e.g John)"
                    className=" p-2 md:p-2 pr-10 block w-[90%] shadow-sm sm:text-sm bg-[#4D4D4D] rounded-md"
                    value={telegramFirstName}
                    onChange={(e) => setTelegramFirstName(e.target.value)} // Update state when input changes
                  />
                  <button
                    className="m-3 text-[12px]"
                    onClick={() => handlePasteButtonClick('firstname')}
                  >
                    Paste
                  </button>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex">
                  <label className="block m-2 text-sm font-medium text-white">
                    3.
                  </label>
                  <p className="m-2 text-sm">
                    Join our Telegram group{' '}
                    <Link href="https://t.me/daowakanda">
                      <span className="text-[#68BBE3] cursor-pointer">
                        @daoWakanda
                      </span>
                    </Link>{' '}
                    and input your last name below :
                  </p>
                </div>
                <div className="ml-7 flex bg-[#000] rounded-md text-sm">
                  <input
                    type="text"
                    name="telegram_last_name"
                    placeholder="Enter telegram lastname (e.g Doe)"
                    className=" p-2 md:p-2 pr-10 block w-[90%] shadow-sm sm:text-sm bg-[#4D4D4D] rounded-md"
                    value={telegramLastName}
                    onChange={(e) => setTelegramLastName(e.target.value)} // Update state when input changes
                  />
                  <button
                    className="m-3 text-[12px]"
                    onClick={() => handlePasteButtonClick('lastname')}
                  >
                    Paste
                  </button>
                </div>
              </div>

              {/* <div className="mb-5 w-[100%]">
                <div className="flex">
                  <h1 className="m-2 text-sm font-medium text-white">4.</h1>
                  <div className="w-full flex bg-[#000] text-sm rounded-md">
                    <input
                      type="text"
                      disabled={activeAddress ? true : false}
                      name="walletAddress"
                      placeholder="Enter Wallet Address"
                      className=" p-2 md:p-2 pr-10 block w-[90%] shadow-sm sm:text-sm bg-[#4D4D4D] rounded-md"
                      value={
                        activeAddress
                          ? formatWalletAddress(`${activeAddress}`)
                          : `Enter Wallet Address`
                      }
                      onChange={() =>
                        setWalletAddressValue(
                          activeAddress
                            ? formatWalletAddress(`${activeAddress}`)
                            : 'Enter Wallet Address',
                        )
                      }
                      // if active address ? show address  Update state when input changes
                    />
                    <button
                      className="m-3 text-[12px]"
                      onClick={() => handlePasteButtonClick('walletAddress')}
                    >
                      Paste
                    </button>
                  </div>
                </div>
              </div> */}
              <div>
                <button
                  type="button"
                  onClick={handleClaimNFT}
                  className={`w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium ${
                    // Conditional class to make the button inactive
                    telegramUsername && telegramFirstName && telegramLastName
                      ? 'text-black bg-[#4EE248]'
                      : 'text-black bg-[#DAF7A6] cursor-not-allowed'
                  }`}
                  disabled={
                    telegramUsername && telegramFirstName && telegramLastName
                      ? false
                      : true
                  }
                >
                  {loading && (
                    <ThreeDots
                      visible={true}
                      height="30"
                      width="80"
                      color="#fff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                  {loading ? `Claiming NFT...` : `Claim NFT`}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="flex justify-center items-center" />
          <img
            src="https://res.cloudinary.com/dlinprg6k/image/upload/v1712975615/Online-payment_eqxqmc.png"
            alt="Online payment"
            className="hidden md:block absolute bottom-5 right-5 w-[250px] h-auto"
          />
        </div>
        <div className="m-10">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-white flex justify-center text-center items-center mb-5 text-[16px] md:text-[25px] font-bold">
              Can I receive the Wakanda NFT more than once?
            </h1>
            <p className="text-[#d8d8d8d0] text-center text-[13px] md:text-[16px]">
              The Wakanda NFT Faucet dispenses once to each wallet.
            </p>
          </div>
        </div>
      </div>
      {/*Faucet Page section Ends*/}

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
