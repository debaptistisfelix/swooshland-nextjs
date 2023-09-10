import styles from './page.module.css'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import NewsletterSection from '@app/components/Dashboard/NewsletterPage/NewsletterSection/NewsletterSection'
import BannerImage from "@/public/banner-images/fabiPoster.jpg"

export const metadata = {
  title: 'Dahsboard - Newsletter',
  description: 'Manage your Newsletter Subscription.',
} 

export default function NewsletterPage() {
  return (
    <main className={`${styles.newsletterPage} ${poppins.className}`}>
        <div className={styles.imageBox}>
            <div className={styles.shader}>    </div>
            <div className={styles.bannerTextBox}>
                <h2 className={styles.bannerTitle}>Newsletter Subscription</h2>
                <p className={styles.bannerSubtitle}>Sneak Peeks to always stay updated on the newest kickz</p>
            </div>
            <Image
            priority={true}
            sizes="(min-width: 1040px) calc(83.42vw - 173px), (min-width: 620px) calc(82.5vw - 104px), 100vw"
            style={{objectFit: "cover"}}
            className={styles.image} src={BannerImage} placeholder='blur' fill="true" alt="poster-with-model" />
        </div>
        <NewsletterSection />
    </main>
  )
}
