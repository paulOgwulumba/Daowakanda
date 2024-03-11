import styles from './index.module.scss';

interface CardProps{
    name: string;
    image: string;
    date: string;
    topic: string;
}
export function BlogCard({name, image, date, topic}:CardProps){
    return (
        <div className={styles["card"]}>
            <img src={image} alt="blog-post" />
            <div className={styles["card-detail"]}>
                <div className={styles["topic"]}>{topic}</div>
                <div className={styles["author"]}>Author: {name}</div>
                <div className={styles["date"]}>{date}</div>
            </div>
        </div>
    );
}