import styles from './page.module.css'
import HorizontalDivider from '@app/components/Reusables/HorizontalDivider/HorizontalDivider'
import { poppins } from '@app/fonts'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { faEnvelope, faTruck, faHeart, faList } from '@fortawesome/free-solid-svg-icons'

export const metadata = {
    title: 'Dahsboard - Swooshland Customs',
    description: 'Manage your orders, addresses, favorites and newsletter subscription.',
  } 

export default function Dashboard() {
  return (
    <main className={`${styles.dashboardPage} ${poppins.className}`}>
        <div className={styles.imageBox}>
            <div className={styles.shader}>    </div>
            <div className={styles.bannerTextBox}>
                <h2 className={styles.bannerTitle}>Dashboard</h2>
                <p className={styles.bannerSubtitle}>Sneaker Central: Take Control of your Style</p>
            </div>
            <Image
            priority={true}
            sizes="(min-width: 1040px) calc(83.42vw - 173px), (min-width: 620px) calc(82.5vw - 104px), 100vw"
            style={{objectFit: "cover"}}
            className={styles.image} src="/banner-images/fabioPoster.jpg" fill="true" alt="poster-with-model" />
        </div>
        <p className={styles.parag}>

        Streamline your online retail journey with our comprehensive e-commerce dashboard. Take charge of your orders, manage saved addresses, curate favorite products, and stay updated with personalized newsletters. Enjoy a hassle-free shopping experience tailored to your preferences.
        </p>
        <section className={styles.mobileNav}>
        <Link href="/dashboard/addresses" className='Link'>
            <div className={styles.navBox}>
               
                  <h3 className={styles.navTitle}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon} />
                  Addresses</h3>
                 
                <p className={styles.navParag}>Check your saved shipping addresses or add no ones.</p>
            </div>
            </Link>

            <Link className='Link' href="/dashboard/favorites">
            <div className={styles.navBox}>
               
                <h3 className={styles.navTitle}>
                  <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                  Favorites</h3>
          
                <p className={styles.navParag}>Check the items you liked so far on our shop.</p>
            </div>
            </Link>

            <Link className='Link' href="/dashboard/newsletter">
            <div className={styles.navBox}>
               
                <h3 className={styles.navTitle}>
                  <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                  Newsletter</h3>
               
                <p className={styles.navParag}>
                Handle your Swooshland Newsletter subscriptiion.

                 </p>
            </div>
            </Link>
            <Link className='Link' href="/dashboard/orders">
            <div className={styles.navBox}>
             
              <h3 className={styles.navTitle}>
                  <FontAwesomeIcon icon={faList} className={styles.icon} />
                  Orders</h3>
             
                <p className={styles.navParag}> Check the status/tracking of  your new orders, or take a look at your old ones.</p>
            </div>
            </Link>
            
        </section>
    </main>
  )
}
