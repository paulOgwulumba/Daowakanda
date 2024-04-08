import React from 'react';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';

interface Props {
  isActive: boolean;
  totalVote: any;
  yes: any;
  no: any;
  onclick: () => any;
}

export function CongratsModal({
  isActive,
  onclick,
  totalVote,
  yes,
  no,
}: Props) {
  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <img
            src="https://res.cloudinary.com/dlinprg6k/image/upload/v1711214032/Clip_path_group_pzpapg.png"
            alt="congrats message"
          />
          <div className={styles['message']}>
            Congratulations, your proposal got approved.
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
          <div className={styles['btn']}>Claim funding</div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
