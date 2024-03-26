import React, { useState } from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Tags } from '../shared';
import styles from './index.module.scss';

interface CardProps {
  title: string;
  yesVote: string;
  onclick: () => any;
}

export function CardVote({ title, yesVote, onclick }: CardProps) {
  const [showdropDown, setShowDropDown] = useState(false);
  const [clickActiveYes, setClickActiveYes] = useState(false);
  const [clickActive, setClickActive] = useState(false);

  const noVotes = 100 - Number(yesVote);

  const toggleDropDown = () => {
    setShowDropDown(!showdropDown);
  };
  const toggleClickYes = () => {
    setClickActiveYes(!clickActiveYes);
  };
  const toggleClick = () => {
    setClickActive(!clickActive);
  };

  return (
    <div className={styles['cardVote']}>
      <div className={styles['top-content']}>
        <div className={styles['title']}>{title}</div>
        <IoIosArrowDown
          className={styles[showdropDown ? 'icon-active' : 'icon']}
          onClick={toggleDropDown}
        />
      </div>
      <div className={styles['voteform']}>
        <div className={styles['form']}>
          <div
            className={styles['overlay']}
            style={{ width: `${yesVote}%` }}
          ></div>
          <div className={styles['left']}>
            {clickActiveYes ? (
              <FaCircle className={styles['icon']} onClick={toggleClickYes} />
            ) : (
              <FaRegCircle
                className={styles['icon']}
                onClick={toggleClickYes}
              />
            )}{' '}
            Yes
          </div>
          <div className={styles['right']}>{yesVote}</div>
        </div>

        <div className={styles['form']}>
          <div
            className={styles['overlay']}
            style={{ width: `${noVotes}%` }}
          ></div>
          <div className={styles['left']}>
            {clickActive ? (
              <FaCircle className={styles['icon']} onClick={toggleClick} />
            ) : (
              <FaRegCircle className={styles['icon']} onClick={toggleClick} />
            )}{' '}
            No
          </div>
          <div className={styles['right']}>{`${noVotes.toFixed(2)}%`}</div>
        </div>
      </div>
      <div className={styles['tags-content']}>
        <div className={styles['left']}>No voting power</div>
        <div className={styles['right']}>
          <Tags title={'Tag#32'} color={'#002E68'} />
          <Tags title={'Active'} color={'#A04100'} />
          <div className={styles['votingTime']}>
            Voting ends in:{' '}
            <Tags title={'6 days 20h 23m 12s'} color={'#003A03'} />
          </div>
          <div
            className={styles[showdropDown ? 'delete-hide' : 'delete']}
            onClick={onclick}
          >
            <RiDeleteBin6Line className={styles['icon']} />
            Delete
          </div>
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
        </div>
      )}
    </div>
  );
}
