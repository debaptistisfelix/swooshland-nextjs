import styles from './MainBanner.module.css';
import Image from 'next/image';
import { montserrat } from '@app/fonts';

export default function MainBanner() {
  return (
   <main className={`${styles.banner} ${montserrat.className}`}>
      
      <div className={styles.imgBox}>
        <Image src="/lustRogue.png" alt="jordan-1-mid-rogue" fill={true} style={{objectFit: "contain"}}  />
      
        
      </div>
      <div className={styles.mobileParagBox}>
        <p className={`${styles.parag} ${styles.mobileParag}`}>"A scarlett Rock&Roll soul that makes anyone fall in love at first sight."</p>
        <button className={`${styles.rogueBtn} ${styles.mobileRogueBtn}`}>Add</button>
        </div>
      <div className={styles.textBox}>
        <div className={styles.brandBox}>
          <h5 className={styles.nike}>NIKE</h5>
          <h1 className={styles.jordan}>JORDAN 1 MID</h1>
          <h3 className={styles.rogue}>ROGUE COLLECTION</h3>
        </div>
        <div className={styles.lustBox}>
          <h3 className={styles.lust}>Sin of Lust</h3>
          <p className={styles.parag}>"A scarlett Rock&Roll soul that makes anyone fall in love at first sight."</p>
        </div>
        <button className={styles.rogueBtn}>Shop</button>
      </div>
   </main>
  )
}
