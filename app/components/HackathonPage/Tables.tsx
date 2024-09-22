import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export function Tables() {

  const DataOne = [
    {
      tracks: 'Financial Inclusion',
      prizes: ['1st Prize: $3,000 USDCa', '2nd Prize: $1,750 USDCa', '3rd Prize: $750 USDCa'],
    },
    {
      tracks: 'Supply Chain',
      prizes: ['1st Prize: $3,000 USDCa', '2nd Prize: $1,750 USDCa', '3rd Prize: $750 USDCa'],
    },
    {
      tracks: 'Decentralized Identity',
      prizes: ['1st Prize: $3,000 USDCa', '2nd Prize: $1,750 USDCa', '3rd Prize: $750 USDCa'],
    },
    {
      tracks: 'Technical Challenges',
      prizes: ['$3,500 USDCa'],
    },
  ]

  const Dates = [
    {
      firstSection: ['Registration Opens:', 'September 15th'],
      secondSection: ['Hacking Window:', 'October 1st - November 2nd'],
    },
    {
      firstSection: ['Submission Window:', 'October 8th - October 15th'],
      secondSection: ['Shortlisting Phase:', 'October 15th - October 20th'],
    },
    {
      firstSection: ['Shortlist Result Announcement:', 'October 21st'],
      secondSection: ['Final Demo Date:', 'October 26th (IRL)'],
    },
  ]

  return (
    <div className={styles['table-containers']}>

      <div className={styles['table-container-one']}>
        <div className={styles['header']}>
          <div className={styles['title']}>
            Tracks
          </div>
          <div className={styles['title']}>
            Prizes
          </div>
        </div>
        <div className={styles['table-body']}>
          {
            DataOne.map((item, index) => (
              <div className={styles['row']} key={index}>
                <div className={styles['column']}>
                  {item.tracks}
                </div>
                <div className={styles['column']}>
                  {item.prizes.map((item, index) => (
                    <div className={styles['items']} key={index}>{item}</div>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className={styles['table-container-two']}>
        <div className={styles['header']}>
          <div className={styles['title']}>
            Important Dates
          </div>
        </div>
        <div className={styles['table-body']}>
          {
            Dates.map((item, index) => (
              <div className={styles['row']} key={index}>
                <div className={styles['column']}>
                  {item.firstSection.map((item, index) => (
                    <div className={styles['items']} key={index}>{item}</div>
                  ))} 
                </div>
                <div className={styles['column']}>
                  {item.secondSection.map((item, index) => (
                    <div className={styles['items']} key={index}>{item}</div>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
}
