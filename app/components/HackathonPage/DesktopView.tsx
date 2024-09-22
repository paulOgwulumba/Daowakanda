import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import { Tables } from './Tables';

export function DesktopView() {

  const steps = [
    {
      id: 1,
      title: 'Connect',
      text: `with our regional audience`
    },
    {
      id: 2,
      title: 'Recognize',
      text: `the abundance of talent in the entrepreneurial and development fields`,
    },
    {
      id: 3,
      title: 'Empower',
      text: 'local developers and innovators to explore the unique capabilities of this cutting-edge blockchain technology'
    },
    {
      id: 4,
      title: 'Enable collaboration',
      text: 'between developers and entrepreneurs'
    },
  ]

  return (
    <div className={styles['main-desktop']}>

      <div className={styles['hero-section']}>
        <div className={styles['overlay']}></div>
        <div className={styles['advert-card']}>
          <div className={styles['title']}><div className={styles.dot}></div> Algorand Regional Hackathon 2024 </div>
          <div className={styles['inner-content']}> 
            <div className={styles['top']}> 
              <div className={styles['lead']}>Naija, <br /> Make Your Move</div>
              <div className={styles['text']}>It's time to make your next move with Algorand and stand a chance to win from a pool of <span>$20,000 USDCa</span></div>
            </div>
            <div className={styles['bottom']}> 
              <button className={styles['btn-register']}>Register</button>
              <button className={styles['btn-learn']}>Learn more</button>
            </div>
          </div>
        </div>
        <div className={styles['img']}>
          <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1727001516/dramatic-chess-piece__3__1-removebg-preview_wsmeo8.png" alt="chess" />
        </div>
      </div>
      {/*end of hero section*/}

      <div className={styles['info-section']}>
        <div className={styles['top-section']}>
          <div className={styles['title']}><div className={styles.dot}></div> Algorand Regional Hackathon 2024 </div>
          <div className={styles['text']}>We are thrilled to announce our upcoming regional hackathons in Nigeria following the immense success of our global hackathon earlier this year.</div>
        </div>
        <div className={styles['bottom-section']}>
          <div className={styles['left']}> 
            <div className={styles['title']}>This is an exciting step towards our effort to:</div>
            <div className={styles['inner-content']}>
              {
                steps.map((item, index) => (
                  <div className={styles['step']} key={index}>
                    <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1727004788/checkmark-badge-04_w46zdh.png" alt="badge" />
                    <div className={styles['step-text']}>{item.title}&nbsp;<div className={styles['span']}>{item.text}</div></div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className={styles['right']}> 
            <div className={styles['paragraph']}>
              These regional hackathons will serve as a stepping-stone to our next global event, allowing us to focus on building stronger community ties, fostering collaboration, and encouraging the creation of higher-quality projects.
              Our goal is to showcase the talent in these countries and enable participants to build impactful solutions on Algorand that address regional challenges and set the stage for success in the global ecosystem.
            </div>
            <Link className={styles['get-started']} href={'/'}>Get started <MdArrowOutward className={styles['icon']}/></Link>
          </div>  
        </div>
       
      </div>
      {/*end of info section*/}
      <div className={styles['img-break-section']}></div>
      {/*end of img section*/}
      <div className={styles['prize-section']}>
        <div className={styles['top-section']}>
          <div className={styles['title']}><div className={styles.dot}></div> Hackathon Prize Breakdown </div>
          <div className={styles['text']}>up to <span>$20,000 USDCa in prize</span></div>
        </div>
        <Tables />
      </div>
       {/*end of prize section*/}
    </div>
  );
}
