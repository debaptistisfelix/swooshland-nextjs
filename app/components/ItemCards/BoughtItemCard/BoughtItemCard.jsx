import styles from './BoughtItemCard.module.css'
import Image from 'next/image'

export default function BoughtItemCard() {
  return (
    <main className={styles.card}>
        <div className={styles.imgBox}>
            <Image src="/lust1.jpg" alt="sneaker-photo" fill={true} />
        </div>
        <div className={styles.textBox}>
            <h4 className={styles.product}>Jordan 1 Mid Rogue</h4>
            <h6 className={styles.name}>Sin of Lust</h6>
            <h5 className={styles.price}>$ 289.90</h5>
            <h6 className={styles.size}>Size: <b className={styles.bolder}>EU 39</b></h6>
        </div>
    </main>
  )
}
