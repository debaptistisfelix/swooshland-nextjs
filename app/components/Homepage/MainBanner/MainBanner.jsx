import styles from './MainBanner.module.css';
import Image from 'next/image';
import { montserrat } from '@app/fonts';
import Link from 'next/link';
import JordanImage from '@/public/lustRogue.png';

export default function MainBanner() {
  return (
   <main className={`${styles.banner} ${montserrat.className}`}>
      
      <div className={styles.imgBox}>
        <Image
        sizes="(min-width: 1040px) 48.01vw, (min-width: 660px) 54.17vw, (min-width: 400px) 357px, calc(62.5vw + 113px)" 
        priority={true} src={JordanImage}  alt="jordan-1-mid-rogue" fill={true} style={{objectFit: "contain"}}  />
      
        
      </div>
      <div className={styles.mobileParagBox}>
        <p className={`${styles.parag} ${styles.mobileParag}`}>"A scarlett Rock&Roll soul that makes anyone fall in love at first sight."</p>
        <button className={`${styles.rogueBtn} ${styles.mobileRogueBtn}`}>
        <Link className={`Link ${styles.link}`} href="/item/64d4f2a72862dff874b44775">Shop</Link>
        </button>
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
        <button className={`${styles.rogueBtn}`}>
          <Link className={`Link ${styles.link}`} href="/item/64d4f2a72862dff874b44775">Shop</Link>
        </button>
      </div>
   </main>
  )
}
