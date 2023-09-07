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
            <Image alt="nikeaf1" fill="true" className={styles.image} src="/walletSu.jpg" />
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
