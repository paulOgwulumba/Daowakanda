import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Tags } from '../shared';
import styles from './index.module.scss';

interface CardProps {
  title: string;
  date: string;
  tag: string;
  status: string;
  color: string;
}

export function CardAfterVote({ title, date, tag, status, color }: CardProps) {
  const [showdropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showdropDown);
  };

  return (
    <div className={styles['cardAfterVote']}>
      <div className={styles['top-content']}>
        <div className={styles['title']}>{title}</div>
        <IoIosArrowDown
          className={styles[showdropDown ? 'icon-active' : 'icon']}
          onClick={toggleDropDown}
        />
      </div>
      <div className={styles['bottom-content']}>
        <div className={styles['left']}>{date}</div>
        <div className={styles['right']}>
          <Tags title={tag} color={'#002E68'} />
          <Tags title={status} color={color} />
        </div>
      </div>
      {showdropDown && (
        <div className={styles['hide-content']}>
          <div className={styles['top']}>
            <div className={styles['body-text']}>
              Lorem ipsum dolor sit amet consectetur. Sed lacinia purus eget
              massa suspendisse pretium massa vitae vitae. Facilisi facilisi
              massa sapien enim dignissim. Aliquet consectetur tortor urna id
              cursus tristique blandit faucibus at. Vitae enim lectus ipsum dui
              tellus fermentum dolor laoreet viverra. Aliquam nisl purus egestas
              pellentesque tincidunt dui et pulvinar ipsum. Pretium commodo ac
              vulputate erat eget nunc. Praesent non netus egestas ornare
              praesent mattis semper phasellus. Interdum pulvinar sed ut sit ut
              gravida pharetra velit pulvinar. Odio bibendum duis faucibus at
              dolor elit orci.
            </div>
            <div className={styles['vote-card']}>
              <div className={styles['title']}>Vote Information</div>
              <div className={styles['table']}>
                <div className={styles['row']}>
                  <div className={styles['column']}>Author</div>
                  <div className={styles['column']}>Tom</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>Start Date</div>
                  <div className={styles['column']}>07 Nov, 2023</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>End Date</div>
                  <div className={styles['column']}>14 Nov, 2023</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>Total Votes</div>
                  <div className={styles['column']}>10</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>Algo Amount</div>
                  <div className={styles['column']}>453,659</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles['bottom']}>
            <div className={styles['yes-poll-card']}>
              <div className={styles['top-count']}>
                <div className={styles['count']}>Yes</div>
                <div className={styles['count']}>405,639</div>
              </div>
              <div className={styles['wallet']}>
                <div className={styles['detail']}>Wallet</div>
                <div className={styles['detail']}>Amount</div>
              </div>
              <div className={styles['acct-details']}>
                <div className={styles['row']}>
                  <div className={styles['column']}>0xe33443...3434</div>
                  <div className={styles['column']}>200,242</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>0xe33443...3434</div>
                  <div className={styles['column']}>200,242</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>0xe33443...3434</div>
                  <div className={styles['column']}>200,242</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>0xe33443...3434</div>
                  <div className={styles['column']}>200,242</div>
                </div>
              </div>
              <div className={styles['view']}>View more</div>
            </div>
            <div className={styles['yes-poll-card']}>
              <div className={styles['top-count']}>
                <div className={styles['count']}>No</div>
                <div className={styles['count']}>50,034</div>
              </div>
              <div className={styles['wallet']}>
                <div className={styles['detail']}>Wallet</div>
                <div className={styles['detail']}>Amount</div>
              </div>
              <div className={styles['acct-details']}>
                <div className={styles['row']}>
                  <div className={styles['column']}>0xe33443...3434</div>
                  <div className={styles['column']}>16,242</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>0xe33443...3434</div>
                  <div className={styles['column']}>12,242</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>0xe33443...3434</div>
                  <div className={styles['column']}>10,242</div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['column']}>0xe33443...3434</div>
                  <div className={styles['column']}>4,242</div>
                </div>
              </div>
              <div className={styles['view']}>View more</div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
