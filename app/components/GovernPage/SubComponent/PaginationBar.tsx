import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from '../index.module.scss';
import { useEffect, useState } from 'react';

export const PaginationBar = () => {
  const [active, setActive] = useState(true);

  return (
    <div className={styles['pagination-outer']}>
      <div className={styles['pagination-container']}>
        <div className={styles['prev']}>
          <FaArrowLeft className={styles['icon']} />
          Previous
        </div>
        <div className={styles['page-section']}>
          <div className={styles['page']}>1</div>
          <div className={styles['page']}>2</div>
          <div className={styles[active ? 'page-active' : 'page']}>3</div>
          <div className={styles['page']}>...</div>
          <div className={styles['page']}>8</div>
          <div className={styles['page']}>9</div>
          <div className={styles['page']}>10</div>
        </div>

        <div className={styles['next']}>
          Next <FaArrowRight className={styles['icon']} />
        </div>
      </div>
    </div>
  );
};
