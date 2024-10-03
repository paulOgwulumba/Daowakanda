import Link from 'next/link';
import styles from './index.module.scss';
import { IProposalContract } from '@/interfaces/proposal.interface';

interface CardProps {
  data: IProposalContract;
}

export const CardProposal = ({ data }: CardProps) => {
  const now = Date.now();
  const yesVote = data.yesVotes.length;
  const noVote = data.noVotes.length;
  const { title, description, appId, endDate, creator } = data;

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    const firstSix = address.slice(0, 6);
    const lastSix = address.slice(-6);
    return `${firstSix}...${lastSix}`;
  };

  const status =
    now < data.endDate
      ? `Active`
      : data.yesVotes.length > data.noVotes.length
      ? `Approved`
      : `Denied`;

  const statusClass =
    now < data.endDate
      ? `header`
      : data.yesVotes.length > data.noVotes.length
      ? `header-approved`
      : `header-denied`;

  const yesPercentage = (yesVote / (yesVote + noVote)) * 100;
  const noPercentage = (noVote / (yesVote + noVote)) * 100;

  return (
    <Link className={styles['proposal-card']} href={`/governance/${appId}`}>
      <div className={styles[statusClass]}>
        <div className={styles['status']}>{status}</div>
        <div className={styles['endtime']}>
          {new Date(endDate).toDateString()}
        </div>
      </div>
      <div className={styles['title-content']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['tag']}>{`Voting Tag: #${appId}`}</div>
      </div>
      <div className={styles['texts']}>{description}</div>
      <div className={styles['bottom-content']}>
        <div className={styles['top-section']}>
          <div className={styles['yes-no-block']}>
            <span>{`Yes(${
              isNaN(yesPercentage) ? 0 : Math.round(yesPercentage)
            }%)`}</span>
            <span>{`No(${
              isNaN(noPercentage) ? 0 : Math.round(noPercentage)
            }%)`}</span>
          </div>
          <div className={styles['vote-line']}>
            <div
              className={styles['inner-line']}
              style={{
                width: `${
                  isNaN(yesPercentage) ? 50 : Math.round(yesPercentage)
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className={styles['statistics']}>
          <div className={styles['address']}>
            {`By ${formatWalletAddress(creator)}`}
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725207509/Frame_144_e7mnip.png"
              alt="icon"
            />
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
