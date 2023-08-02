import styles from './SearchCard.module.css';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function SearchCard() {
  return (
    <main className={`${styles.card} ${poppins.className}`}>
        <section className={styles.imgBox}>
            <Image className={styles.img} src="/lust1.jpg" fill={true} alt="sneaker" />
        </section>
        <section className={styles.textBox}>
            <h1 className={styles.title}>Jordan 1 Mid</h1>
            <h2 className={styles.name}>Sin of Lust</h2>
            <div className={styles.starBox}>
                <FontAwesomeIcon icon={faStar} className={styles.star} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
            </div>
            <h1 className={styles.price}>$289.90</h1>
        </section>
   </main>
  )
}
