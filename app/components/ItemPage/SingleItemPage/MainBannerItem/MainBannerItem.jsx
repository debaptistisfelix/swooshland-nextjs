import Image from 'next/image'
import styles from './MainBannerItem.module.css'
import { poppins } from '@app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import TextBlock from './TextBlock/TextBlock'
import Gallery from './Gallery/Gallery'

export default function MainBannerItem() {
  return (
    <main className={`${styles.banner} ${poppins.className}`}>
        <section className={styles.galleryBox}>
           <Gallery />
        </section>
        <section className={styles.textBox}>
            <TextBlock />
        </section>
    </main>
  )
  }