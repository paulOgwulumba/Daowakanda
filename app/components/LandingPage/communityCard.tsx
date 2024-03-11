import styles from './index.module.scss';

interface CardProps{
    text: string;
    image: string;
    topic: string;
}
export function CommunityCard({image, text, topic}:CardProps){
    return (
        <div className={styles["card"]}>
            <img src={image} alt="post" />
            <div className={styles["card-detail"]}>
                <div className={styles["topic"]}>{topic}</div>
                <div className={styles["text"]}>{text}</div>
            </div>
        </div>
    );
}