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
        sizes="100vw"
        srcset="
          /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlustRogue.3ce4afbd.png&w=640&q=75 640w,
          /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlustRogue.3ce4afbd.png&w=750&q=75 750w,
          /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlustRogue.3ce4afbd.png&w=828&q=75 828w,
          /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlustRogue.3ce4afbd.png&w=1080&q=75 1080w,
          /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlustRogue.3ce4afbd.png&w=1200&q=75 1200w,
          /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlustRogue.3ce4afbd.png&w=1920&q=75 1920w,
          /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlustRogue.3ce4afbd.png&w=2048&q=75 2048w,
          /_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlustRogue.3ce4afbd.png&w=3840&q=75 3840w
        "
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
