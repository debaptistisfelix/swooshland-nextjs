import styles from './page.module.css'
import HorizontalDivider from '@app/components/Reusables/HorizontalDivider/HorizontalDivider'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import NoSizeCard from '@app/components/ItemCards/NoSizeCard/NoSizeCard'


export default function Favorites() {
  return (
    <main className={`${styles.newsletterPage} ${poppins.className}`}>
        <div className={styles.imageBox}>
            <div className={styles.shader}>    </div>
            <div className={styles.bannerTextBox}>
                <h2 className={styles.bannerTitle}>Your Favorites</h2>
                <p className={styles.bannerSubtitle}>Create and Manage your Dream Wishlist</p>
            </div>
            <Image
            style={{objectFit: "cover"}}
            className={styles.image} src="/banner-images/giulyPoster.jpg" fill="true" alt="poster-with-model" />
        </div>
        <section className={styles.list}>
          <NoSizeCard />
          <NoSizeCard />
          <NoSizeCard />
          <NoSizeCard />
          <NoSizeCard />
          <NoSizeCard />
          <NoSizeCard />
          <NoSizeCard />
          <NoSizeCard />
          <NoSizeCard />
        
        </section>
    </main>
  )
}