import Link from 'next/link';
import styles from './index.module.scss';


interface CardProps{
  id: number;
  title: string;
  yesVote: number;
  noVote: number;
  tag: string;
  isActive: boolean;
  description: string;
  end_time: string;
  created_on: string;
  wallet_address: string;
}

export const CardProposal = ({id, title, yesVote, noVote, isActive, description, end_time, created_on, wallet_address, tag}:CardProps) => {

  const status = isActive ? `Active`: 
                  yesVote > noVote ? `Approved` : `Denied`;

  const statusClass = isActive ? `header`: 
  yesVote > noVote ? `header-approved` : `header-denied`;

  const yesPercentage = ((yesVote/(yesVote + noVote)) * 100).toFixed(2);
  const noPercentage = ((noVote/(yesVote + noVote)) * 100).toFixed(2);
  return (
    <Link className={styles['proposal-card']} href={'/governance'}>
      <div className={styles[statusClass]}>
        <div className={styles['status']}>
          {status}
        </div>
        <div className={styles['endtime']}>
          {end_time}
        </div>
      </div>
      <div className={styles['title-content']}>
        <div className={styles['title']}>
          {title}
        </div>
        <div className={styles['tag']}>
          {`Voting Tag: #${tag}`}
        </div>
      </div>
      <div className={styles['texts']}>
        {description}
      </div>
      <div className={styles['bottom-content']}>
        <div className={styles['top-section']}>
          <div className={styles['yes-no-block']}>
            <span>{`Yes(${yesPercentage}%)`}</span>
            <span>{`No(${noPercentage}%)`}</span>
          </div>
          <div className={styles['vote-line']}>
            <div className={styles['inner-line']} style={{width: `${yesPercentage}%`}}></div>
          </div>
        </div>
        <div className={styles['statistics']}>
          <div className={styles['address']}>
            {`By ${wallet_address}`}
            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725207509/Frame_144_e7mnip.png" alt="icon" />
          </div>
          <div className={styles['votes']}>
            Total Votes:
            <span>{yesVote + noVote}</span>
          </div>
        </div>
      </div>
    </Link>   
  );
};
