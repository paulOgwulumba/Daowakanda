import React, { useState } from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Tags } from '../shared';
import styles from './index.module.scss';
import moment from 'moment';
import { DeleteModal } from './deleteModal';

interface CardProps {
  title: string;
  yesVote: any;
  noVote: any;
  tag: string;
  description: string;
  isActive: boolean;
  created_on: string;
  end_time: string;
  id: any;
}

export function CardVote({
  title,
  yesVote,
  noVote,
  description,
  isActive,
  created_on,
  end_time,
  id,
  tag,
}: CardProps) {
  const [showdropDown, setShowDropDown] = useState(false);
  const [clickActiveYes, setClickActiveYes] = useState(false);
  const [clickActive, setClickActive] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showdropDown);
  };
  const toggleClickYes = () => {
    setClickActiveYes(!clickActiveYes);
  };
  const toggleClick = () => {
    setClickActive(!clickActive);
  };
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
    console.log(id);
  };
  const clearDeleteModal = () => {
    setDeleteModal(false);
  };
  return (
    <>
      {deleteModal && (
        <DeleteModal
          isActive={deleteModal}
          onclick={clearDeleteModal}
          setDeleteModal={setDeleteModal}
          id={id}
        />
      )}
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
            <div className={styles['right']}>{`${yesVote}%`}</div>
          </div>

          <div className={styles['form']}>
            <div
              className={styles['overlay']}
              style={{ width: `${noVote}%` }}
            ></div>
            <div className={styles['left']}>
              {clickActive ? (
                <FaCircle className={styles['icon']} onClick={toggleClick} />
              ) : (
                <FaRegCircle className={styles['icon']} onClick={toggleClick} />
              )}{' '}
              No
            </div>
            <div className={styles['right']}>{`${noVote}%`}</div>
          </div>
        </div>
        <div className={styles['tags-content']}>
          <div className={styles['left']}>No voting power</div>
          <div className={styles['right']}>
            <Tags title={`Tag#${tag}32`} color={'#002E68'} />
            <Tags
              title={isActive ? 'Active' : 'Not Active'}
              color={'#A04100'}
            />
            <div className={styles['votingTime']}>
              Voting ends in:{' '}
              <Tags title={'6 days 20h 23m 12s'} color={'#003A03'} />
            </div>
            <div className={styles['delete']} onClick={toggleDeleteModal}>
              <RiDeleteBin6Line className={styles['icon']} />
              Delete
            </div>
          </div>
        </div>
        {showdropDown && (
          <div className={styles['hide-content']}>
            <div className={styles['top']}>
              <div className={styles['body-text']}>{description}</div>
              <div className={styles['vote-card']}>
                <div className={styles['title']}>Vote Information</div>
                <div className={styles['table']}>
                  <div className={styles['row']}>
                    <div className={styles['column']}>Author</div>
                    <div className={styles['column']}>Tom</div>
                  </div>
                  <div className={styles['row']}>
                    <div className={styles['column']}>Start Date</div>
                    <div className={styles['column']}>
                      {moment.utc(created_on).format('DD MM, YYYY')}
                    </div>
                  </div>
                  <div className={styles['row']}>
                    <div className={styles['column']}>End Date</div>
                    <div className={styles['column']}>
                      {moment.utc(end_time).format('DD MM, YYYY')}
                    </div>
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
    </>
  );
}
