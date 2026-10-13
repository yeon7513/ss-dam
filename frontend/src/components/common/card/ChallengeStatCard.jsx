import styles from './ChallengeStatCard.module.scss';

export default function ChallengeStatCard({ title, value, description }) {
  return (
    <article className={styles.statCard}>
      <span>{title}</span>
      <strong>{value}</strong>
      {description && <small>{description}</small>}
    </article>
  );
}