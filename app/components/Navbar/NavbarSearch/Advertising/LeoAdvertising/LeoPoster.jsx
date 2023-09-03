import styles from './LeoPoster.module.css'
import { poppins } from '@app/fonts'


export default function LeoPoster() {
  return (
    <main className={`${styles.section} ${poppins.className}`}>
       <div className={styles.buttonBox}>
        <button className={styles.btn}>EXPLORE</button>
       </div>
       <div className={styles.nameBox}>
        <h1 className={styles.branName}>Nike Air force 1</h1>
        <h1 className={styles.name}>LEOPARD</h1>
        <h1 className={styles.name}>$189.90</h1>
       </div>
    </main>
  )
}