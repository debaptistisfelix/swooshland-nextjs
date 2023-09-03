import styles from './NavSearchLoader.module.css';

export default function NavSearchLoader() {
  return (
    <main  className={styles.wrapperContainer}>
    <section className={styles.wrapper}>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.circle}></div>
    <div className={styles.shadow}></div>
    <div className={styles.shadow}></div>
    <div className={styles.shadow}></div>
    </section>
</main>
  )
}
