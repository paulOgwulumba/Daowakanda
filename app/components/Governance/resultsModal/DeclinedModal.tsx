import React from 'react';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';

interface Props {
  isActive: boolean;
  onclick: () => any;
  totalVote: any;
  yes: any;
  no: any;
}

export function DeclineModal({ isActive, onclick, totalVote, yes, no }: Props) {
  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <img
            src="https://res.cloudinary.com/dlinprg6k/image/upload/v1711214118/Group_jh0p01.png"
            alt="declined message"
          />
          <div className={styles['message']}>
            Unfortunately, your proposal was declined
          </div>
          <div className={styles['stats']}>
            <div className={styles['vote']}>
              Total votes:<span>{totalVote}</span>
            </div>
            <div className={styles['vote']}>
              Yes:<span>{`${yes}%`}</span>
            </div>
            <div className={styles['vote']}>
              No:<span>{`${no}%`}</span>
            </div>
          </div>
          <div className={styles['btn-declined']} onClick={onclick}>
            Closet
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
