

import styles from './page.module.css'
import HorizontalDivider from '@app/components/Reusables/HorizontalDivider/HorizontalDivider'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import AddressesList from '@app/components/Dashboard/Addresses/AddressesList/AddressesList'
import UserAddressesContextProvider from '@app/context/UserAddressesContext'
import BannerImage from "@/public/banner-images/lallaPoster.jpg"

export const metadata = {
  title: 'Dahsboard - Addresses',
  description: 'Manage your addresses. Add, remove and edit your shipping addresses.',
} 

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
              priority={true}
              sizes="(min-width: 1040px) calc(83.42vw - 173px), (min-width: 620px) calc(82.5vw - 104px), 100vw"
            style={{objectFit: "cover"}}
            className={styles.image} placeholder='blur' src={BannerImage} fill="true" alt="poster-with-model" />
        </div>
        <UserAddressesContextProvider>
            <AddressesList />
        </UserAddressesContextProvider>
    </main>
  )
}