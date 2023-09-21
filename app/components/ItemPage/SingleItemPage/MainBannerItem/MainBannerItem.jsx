"use client"

import Image from 'next/image'
import styles from './MainBannerItem.module.css'
import { poppins } from '@app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import TextBlock from './TextBlock/TextBlock'
import Gallery from './Gallery/Gallery'
import { useEffect } from 'react'
import { GalleryProvider } from '@app/context/GalleryContext'

export default function MainBannerItem({item, itemReviews, isLoading, setLoading}) {

  
  return (
    <main className={`${styles.banner} ${poppins.className}`}>
        <section className={styles.galleryBox}>
         
    
          <GalleryProvider>
          <Gallery item={item} />
          </GalleryProvider>
 
        </section>
        <section className={styles.textBox}>
            <TextBlock item={item} itemReviews={itemReviews} isLoading={isLoading} setLoading={setLoading} />
        </section>
    </main>
  )
  }