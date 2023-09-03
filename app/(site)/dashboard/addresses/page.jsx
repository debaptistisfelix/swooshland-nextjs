import styles from './page.module.css'
import HorizontalDivider from '@app/components/Reusables/HorizontalDivider/HorizontalDivider'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import AddressesList from '@app/components/Dashboard/Addresses/AddressesList/AddressesList'
import UserAddressesContextProvider from '@app/context/UserAddressesContext'


export default function Addresses() {
  return (
    <main className={`${styles.newsletterPage} ${poppins.className}`}>
        <div className={styles.imageBox}>
            <div className={styles.shader}></div>
            <div className={styles.bannerTextBox}>
                <h2 className={styles.bannerTitle}>Your Addresses</h2>
                <p className={styles.bannerSubtitle}>Conveniently Manage Your Shipping Addresses</p>
            </div>
            <Image
            style={{objectFit: "cover"}}
            className={styles.image} src="/banner-images/lallaPoster.jpg" fill="true" alt="poster-with-model" />
        </div>
        <UserAddressesContextProvider>
            <AddressesList />
        </UserAddressesContextProvider>
    </main>
  )
}