"use client"
import styles from './AccessoriesSection.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { poppins } from '@app/fonts'
import AccessoriesContextProvider from '@app/context/AccessoriesContext'
import AccessoriesListing from '@app/components/ItemPage/Accessories/AccessoriesListing/AccessoriesListing'
import AccessoriesBanner from '@/public/walletSu.jpg';

export default function AccessoriesSection({accessories}) {
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
  
  return (
    <>
     <section className={styles.container}>
        <Link href="/" className="Link smallNavBackBtnBox">
            <FontAwesomeIcon icon={faArrowLeft} className="smallNavLeftArrowIcon" />
            <span className="smallNavBackBtn">Back to Home</span>
        </Link>
        <FontAwesomeIcon onClick={toggleMobileFilters} icon={faSliders} className={`smallNavRightArrowIcon ${styles.filtersIcon}`} />
        
   </section>
        <div className={styles.banner}>

            <Image priority={true}
            placeholder='blur'
            srcSet="
            /_next/image?url=%2FwalletSu.jpg&w=640&q=75 640w,
            /_next/image?url=%2FwalletSu.jpg&w=750&q=75 750w,
            /_next/image?url=%2FwalletSu.jpg&w=828&q=75 828w,
            /_next/image?url=%2FwalletSu.jpg&w=1080&q=75 1080w,
            /_next/image?url=%2FwalletSu.jpg&w=1200&q=75 1200w,
            /_next/image?url=%2FwalletSu.jpg&w=1920&q=75 1920w,
            /_next/image?url=%2FwalletSu.jpg&w=2048&q=75 2048w,
            /_next/image?url=%2FwalletSu.jpg&w=3840&q=75 3840w
          "
            sizes="(min-width: 620px) 90vw, 100vw" alt="nikeaf1" fill="true" className={styles.image} src={AccessoriesBanner} />
            <div className={styles.shader}>
                <div className={styles.text}>
                    <h1 className={styles.title}>Complete your Unique Style</h1>
                </div>
            </div>
        </div>
        <AccessoriesContextProvider>
          <AccessoriesListing accessoriesList={accessories}  mobileFiltersOpen={mobileFiltersOpen} toggleMobileFilters={toggleMobileFilters} />
        </AccessoriesContextProvider>
          </>
  )
}
