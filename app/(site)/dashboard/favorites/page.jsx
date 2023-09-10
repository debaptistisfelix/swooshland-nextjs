import styles from './page.module.css'
import HorizontalDivider from '@app/components/Reusables/HorizontalDivider/HorizontalDivider'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import FavoritesList from '@app/components/Dashboard/Addresses/Favorites/FavoritesList/FavoritesList'

export const metadata = {
  title: 'Dahsboard - Favorites',
  description: 'Manage your Favorite custom Items. Add, remove and edit your wishlist.',
} 

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
            priority={true}
            sizes="(min-width: 1040px) calc(83.42vw - 173px), (min-width: 620px) calc(82.5vw - 104px), 100vw"
            style={{objectFit: "cover"}}
            className={styles.image} src="/banner-images/giulyPoster.jpg" fill="true" alt="poster-with-model" />
        </div>
        <FavoritesList />
    </main>
  )
}