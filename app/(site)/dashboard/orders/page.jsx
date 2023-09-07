import styles from './page.module.css'
import HorizontalDivider from '@app/components/Reusables/HorizontalDivider/HorizontalDivider'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import OrderList from '@app/components/Dashboard/OrderPage/OrderList/OrderList'

export const metadata = {
  title: 'Dahsboard - Orders',
  description: 'Manage your Orders. Track and manage your purchases.',
} 

export default function Orders() {
  return (
    <main className={`${styles.newsletterPage} ${poppins.className}`}>
        <div className={styles.imageBox}>
            <div className={styles.shader}>    </div>
            <div className={styles.bannerTextBox}>
                <h2 className={styles.bannerTitle}>Your Orders</h2>
                <p className={styles.bannerSubtitle}>Tracking and Managing Your Purchases</p>
            </div>
            <Image
            style={{objectFit: "cover"}}
            className={styles.image} src="/banner-images/bubiPoster.jpg" fill="true" alt="poster-with-model" />
        </div>
        <div className={styles.labelBox}>
            <h3 className={`${styles.label} ${styles.label1}`}>Date</h3>
            <h3 className={`${styles.label} ${styles.label2}`}>Order #</h3>
            <h3 className={`${styles.label} ${styles.label3}`}>Items</h3>
            <h3 className={`${styles.label} ${styles.label4}`}>Total</h3>
            <h3 className={`${styles.label} ${styles.label5}`}>Status</h3>
        </div>
        <OrderList />
    </main>
  )
}
