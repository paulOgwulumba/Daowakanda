import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';

interface Props {
    isActive:boolean;
    onclick: ()=> any;
}

export function ConnectWalletModal({isActive, onclick}:Props) {

    return (
        <>
            <BackgroundOverlay visible={isActive} onClose={onclick}>
                <div className={styles["card"]}>
                    <div className={styles["heading-section"]}>
                        <div className={styles["title"]}>
                            Connect a Wallet
                        </div>
                        <div className={styles["text"]}>
                            Supported wallets
                        </div>
                    </div>
                    <div className={styles["options"]}>
                        <div className={styles["bar"]}>
                            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1711008666/Algorand_-_jpeg_b5wilf.png" alt="icon" />
                            Pera Wallet
                        </div>
                        <div className={styles["bar"]}>
                            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1711008663/MetaMask_svg_sedzkn.png" alt="icon" />
                            MetaTask
                        </div>
                        <div className={styles["bar"]}>
                            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1711008665/Trust_Wallet_-_png_bgkcik.png" alt="icon" />
                            Trust Wallet
                        </div>
                        <div className={styles["bar"]}>
                            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1711008661/Coinbase_Wallet_%EF%B8%8F_-_png_ghlyj2.png" alt="icon" />
                            Coinbase Wallet
                        </div>
                        <div className={styles["bar"]}>
                            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1711008658/WalletConnect_-_jpeg_npeopv.png" alt="icon" />
                            Wallet Connect
                        </div>
                    </div>
                </div>
            </BackgroundOverlay>
        </>
    );
}
