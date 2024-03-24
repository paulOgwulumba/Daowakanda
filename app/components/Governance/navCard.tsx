import Link from 'next/link';
import styles from './index.module.scss';

interface CardProps {
    title: string;
    description: string;
    link: string;
}

export function NavCard({ title, description, link }: CardProps) {
    return (
        <Link href={link}>
            <div className={styles['card']}>
                <div className={styles['title']}>{title}</div>
                <div className={styles['desc']}>{description}</div>
            </div>
        </Link>
    );
}
