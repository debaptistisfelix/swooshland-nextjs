import styles from './ShopByCategories.module.css';
import Link from 'next/link';
import { poppins } from '@app/fonts';

export default function ShopByCategories() {
  return (
    <main className={`${styles.section} ${poppins.className}`}>
       <h2 className={styles.title}>Shop by Category</h2>
       <section className={styles.categBox}>

       <div className={styles.boxContainer}>
        <div className={`${styles.box} ${styles.sneakerBox}`}>
            <div className={styles.shader}>
                <div className={styles.text}>
                    <h3 className={styles.categTitle}>
                        Sneakers
                    </h3>
                    <p className={styles.parag}>Explore our Kickz Collection</p>
                    <Link href="/sneakers" className={`Link ${styles.btn}`} >Shop</Link>
                </div>
            </div>
         </div>
       
       </div>

       <Link href="/sneakers" className={`Link ${styles.mobileBoxContainer}`}>
        <div className={`${styles.box} ${styles.sneakerBox}`}>
         </div>
         <h3 className={styles.mobileCategTitle}>
                        Sneakers
                    </h3> 
       </Link>

      
       
       <div className={styles.boxContainer}>
            <div className={`${styles.box} ${styles.accessoriesBox}`}>
            <div className={styles.shader}>
                <div className={styles.text}>
                    <h3 className={styles.categTitle}>
                    Accessories
                    </h3>
                    <p className={styles.parag}>Complete your styles</p>
                    <Link href="/accessories" className={`Link ${styles.btn}`}>Shop</Link>
                </div>
            </div>
        </div>
       
       </div>

       <Link href="/accessories" className={`Link ${styles.mobileBoxContainer}`}>
        <div className={`${styles.box} ${styles.accessoriesBox}`}>
         </div>
         <h3 className={styles.mobileCategTitle}>
                        Accessories
                    </h3> 
       </Link>
       
       </section>
    </main>
  )
}
