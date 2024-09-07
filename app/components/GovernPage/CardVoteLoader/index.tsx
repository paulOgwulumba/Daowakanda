import React from 'react';
import styles from './index.module.scss';

export function CardVoteLoader() {
  return (
    <div className={styles['cardVote']}>
      <div className={styles['top-content']}>
        <div className={styles['title']}></div>
        <div className={styles['icon']}></div>
      </div>
      <div className={styles['voteform']}>
        <div className={styles['left']}></div>
        <div className={styles['left']}></div>
      </div>

      <div className={styles['tags-content']}>
        <div className={styles['left']}></div>
        <div className={styles['right']}>
          <div className={styles['tag']}></div>
          <div className={styles['tag']}></div>
          <div className={styles['tag']}></div>
          <div className={styles['tag']}></div>
        </div>
      </div>
    </div>
  );
}
