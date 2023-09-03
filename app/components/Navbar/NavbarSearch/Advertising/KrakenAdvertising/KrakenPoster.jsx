import styles from './KrakenPoster.module.css'
import { poppins } from '@app/fonts'


export default function KrakenPoster() {
  return (
    <main className={`${styles.section} ${poppins.className}`}>
       <div className={styles.buttonBox}>
        <button className={styles.btn}>EXPLORE</button>
       </div>
       <div className={styles.nameBox}>
       <h1 className={styles.branName}>Nike Air Force 1</h1>
        <h1 className={styles.name}>L.A. KRAKEN</h1>
        <h1 className={styles.name}>$189.90</h1>
       </div>
    </main>
  )
}
