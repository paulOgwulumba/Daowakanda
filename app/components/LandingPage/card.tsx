import styles from './index.module.scss';

interface CardProps{
    title: string;
    description: string;
}
export function Card({title, description}:CardProps){
    return (
        <div className={styles["card"]}>
            <div className={styles["title"]}>{title}</div>
            <div className={styles["description"]}>{description}</div>
        </div>
    );
}