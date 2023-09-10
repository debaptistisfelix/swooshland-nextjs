import styles from './ImageLoader.module.css'

export default function ImageLoader() {
  return (
    <main className={styles.loaderBox}>
        <div className={styles.loader}></div>
    </main>
  )
}
