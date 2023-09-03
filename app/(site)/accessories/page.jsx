"use client"

import Link from 'next/link'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { poppins } from '@app/fonts'
import AccessoriesContextProvider from '@app/context/AccessoriesContext'
import AccessoriesListing from '@app/components/ItemPage/Accessories/AccessoriesListing/AccessoriesListing'


export default function AccessoriesPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(null);

  useEffect(() => {
    if(mobileFiltersOpen === true){
        document.body.style.overflow = "hidden"
    }else {
        document.body.style.overflow = "unset"
    }
}, [mobileFiltersOpen])

  const toggleMobileFilters = ()=>{
    setMobileFiltersOpen(!mobileFiltersOpen);
} 

const accessories = [
  {
    model: "Backpack",
    name: "Himiko Toga",
    category: "Backpack",
    price: 69.90,
    date: "2023-09-16",
    rating: 5,
    onSale: true,
    for: "Women"
  },
  {
    model: "Lunch-box",
    name: "Lamù",
    category: "Lunch-box",
    price: 89.90,
    date: "2023-02-21",
    rating: 3,
    onSale: true,
    for: "Women"
  },
  {
    model: "Manga Wallet",
    name: "Berserk",
    category: "Wallet",
    price: 69.90,
    date: "2023-09-02",
    rating: 2,
    onSale: false,
    for: "Men"
  },
  {
    model: "Manga Wallet",
    name: "Gaara",
    category: "Wallet",
    price: 69.90,
    date: "2023-10-22",
    rating: 4,
    onSale: false,
    for: "Men"
  },
  {
    model: "Manga Wallet",
    name: "Kakashi",
    category: "Wallet",
    price: 69.90,
    date: "2023-01-26",
    rating: 5,
    onSale: false,
    for: "Men"
  },
  {
    model: "Manga Wallet",
    name: "Naruto",
    category: "Wallet",
    price: 69.90,
    date: "2023-10-10",
    rating: 4,
    onSale: false,
    for: "Men"
  },

]
  return (
    <main className={`${styles.accessoriesPage} ${poppins.className}`}>
      <section className={styles.container}>
        <Link href="/" className="Link smallNavBackBtnBox">
            <FontAwesomeIcon icon={faArrowLeft} className="smallNavLeftArrowIcon" />
            <span className="smallNavBackBtn">Back to Home</span>
        </Link>
        <FontAwesomeIcon onClick={toggleMobileFilters} icon={faSliders} className={`smallNavRightArrowIcon ${styles.filtersIcon}`} />
        
   </section>
        <div className={styles.banner}>
            <Image alt="nikeaf1" fill="true" className={styles.image} src="/walletSu.jpg" />
            <div className={styles.shader}>
                <div className={styles.text}>
                    <h1 className={styles.title}>Complete your Unique Style</h1>
                </div>
            </div>
        </div>
        <AccessoriesContextProvider>
          <AccessoriesListing accessories={accessories} mobileFiltersOpen={mobileFiltersOpen} toggleMobileFilters={toggleMobileFilters} />
        </AccessoriesContextProvider>
          
    </main>
  )
}
