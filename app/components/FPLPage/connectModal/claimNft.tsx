import React from 'react';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';

interface Props {
  isActive: boolean;
  onclick: () => any;
  timing: number;
}

export function ClaimNftModal({ isActive, onclick, timing }: Props) {
  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card-claim']}>
          <div className={styles['heading-section']}>
            <div className={styles['title']}>Claim NFT</div>
            <div className={styles['text']}>Scan the QR Code to claim NFT</div>
            <div
              className={styles['text']}
            >{`The QR code closes in ${timing}s`}</div>
          </div>
          <div className={styles['options']}>
            <img
              src={`https://res.cloudinary.com/dlinprg6k/image/upload/v1717309876/QR_ulfrwf.jpg`}
              alt={`qr code icon`}
            />
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
