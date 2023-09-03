import styles from './DiorPoster.module.css'
import { poppins } from '@app/fonts'


export default function DiorPoster() {
  return (
    <main className={`${styles.section} ${poppins.className}`}>
       <div className={styles.buttonBox}>
        <button className={styles.btn}>EXPLORE</button>
       </div>
       <div className={styles.nameBox}>
       <h1 className={styles.branName}>Nike Air Jordan 1 Mid</h1>
        <h1 className={styles.name}>PETAL PINK</h1>
        <h1 className={styles.name}>$289.90</h1>
       </div>
    </main>
  )
}
