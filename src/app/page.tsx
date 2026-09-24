import styles from './page.module.scss';

export default function HomePage(): React.JSX.Element {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Zirka</h1>
    </main>
  );
}
