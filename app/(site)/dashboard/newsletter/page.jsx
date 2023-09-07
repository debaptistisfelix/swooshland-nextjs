import styles from './page.module.css'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import NewsletterSection from '@app/components/Dashboard/NewsletterPage/NewsletterSection/NewsletterSection'

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
            style={{objectFit: "cover"}}
            className={styles.image} src="/banner-images/fabiPoster.jpg" fill="true" alt="poster-with-model" />
        </div>
        <NewsletterSection />
    </main>
  )
}
