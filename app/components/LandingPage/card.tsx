import styles from './index.module.scss';

interface CardProps {
  title: string;
  description: string;
  step?: string;
  image?: string;
  onclick?: any;
  link?: string;
}
export function Card({ title, description, step, image, onclick }: CardProps) {
  return (
    <div className={styles['card']} onClick={onclick}>
      <div className={styles['step']}>{step}</div>
      <img src={image} alt="icon" />
      <div className={styles['title']}>{title}</div>
      <div className={styles['description']}>{description}</div>
    </div>
  );
}
