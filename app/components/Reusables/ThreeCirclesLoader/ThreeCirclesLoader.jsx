import styles from './ThreeCirclesLoader.module.css'

export default function ThreeCirclesLoader() {
  return (
    <main  className={styles.wrapperContainer}>
        <section className={styles.wrapper}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        {/* <span className={styles.loadingText}>Loading</span> */}
        </section>
    </main>
  )
}
