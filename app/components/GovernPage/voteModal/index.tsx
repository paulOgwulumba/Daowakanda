import React, { useState } from 'react';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from 'react-icons/md';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

enum Vote {
  APPROVE = 'Approve',
  DENY = 'Deny',
  MAYBE = 'Maybe',
}

export function VoteModal({ isActive, onclick }: Props) {
  const [checked, setChecked] = useState('');

  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <div className={styles['title']}>Vote</div>

          <div className={styles['options']}>
            <div
              className={
                styles[checked === Vote.APPROVE ? 'option-checked' : 'option']
              }
              onClick={() => setChecked(Vote.APPROVE)}
            >
              {checked === Vote.APPROVE ? (
                <MdOutlineRadioButtonChecked
                  className={styles['icon-checked']}
                />
              ) : (
                <MdOutlineRadioButtonUnchecked className={styles['icon']} />
              )}
              Approve
            </div>

            <div
              className={
                styles[checked === Vote.DENY ? 'option-checked' : 'option']
              }
              onClick={() => setChecked(Vote.DENY)}
            >
              {checked === Vote.DENY ? (
                <MdOutlineRadioButtonChecked
                  className={styles['icon-checked']}
                />
              ) : (
                <MdOutlineRadioButtonUnchecked className={styles['icon']} />
              )}
              Deny
            </div>

            <div
              className={
                styles[checked === Vote.MAYBE ? 'option-checked' : 'option']
              }
              onClick={() => setChecked(Vote.MAYBE)}
            >
              {checked === Vote.MAYBE ? (
                <MdOutlineRadioButtonChecked
                  className={styles['icon-checked']}
                />
              ) : (
                <MdOutlineRadioButtonUnchecked className={styles['icon']} />
              )}
              Maybe
            </div>
          </div>

          <div className={styles['submit-btn']}>Submit vote</div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
