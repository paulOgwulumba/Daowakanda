import styles from './index.module.scss';

interface SpinnerProps {
  height: number;
  width: number;
  color: string;
}
export function Spinner({ height, width, color }: SpinnerProps) {
  return (
    <div
      className={styles['load']}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: `5px solid ${color}`,
      }}
    ></div>
  );
}
