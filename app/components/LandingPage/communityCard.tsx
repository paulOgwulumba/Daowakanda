import Link from 'next/link';
import styles from './index.module.scss';

interface CardProps {
  text: string;
  image: string;
  topic: string;
  address: string;
}
export function CommunityCard({ image, text, topic, address }: CardProps) {
  return (
    <Link className={styles['card']} target="_blank" href={address}>
      <img src={image} alt="post" />
      <div className={styles['card-detail']}>
        <div className={styles['topic']}>{topic}</div>
        <div className={styles['text']}>{text}</div>
      </div>
    </Link>
  );
}
