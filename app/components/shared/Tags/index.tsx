import styles from './index.module.scss';

interface TagProps {
  title: string;
  color: string;
  onclick?: any;
}

export function Tags({ title, color, onclick }: TagProps) {
  return (
    <div
      className={styles['tag']}
      onClick={onclick}
      style={{ background: `${color}` }}
    >
      {title}
    </div>
  );
}
