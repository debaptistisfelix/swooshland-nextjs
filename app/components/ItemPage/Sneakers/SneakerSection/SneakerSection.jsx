"use client"

import Link from 'next/link'
import styles from './SneakerSection.module.css'
import Image from 'next/image'
import SneakerListing from '@app/components/ItemPage/Sneakers/SneakersListing/SneakerListing'
import { useState, useEffect } from 'react'
import SneakersContextProvider from '@app/context/SneakersPageContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faSliders } from '@fortawesome/free-solid-svg-icons'



export default function SneakerSection({sneakers}) {
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
     <section className="container">
        <Link href="/" className="Link smallNavBackBtnBox">
            <FontAwesomeIcon icon={faArrowLeft} className="smallNavLeftArrowIcon" />
            <span className="smallNavBackBtn">Back to Home</span>
        </Link>
        <FontAwesomeIcon onClick={toggleMobileFilters} icon={faSliders} className={`smallNavRightArrowIcon ${styles.filtersIcon}`} />
        
   </section>
        <div className={styles.banner}>
            <Image alt="nikeaf1" fill="true" className={styles.image} src="/kraken.jpg" />
            <div className={styles.shader}>
                <div className={styles.text}>
                    <h1 className={styles.title}>Get the Hottest Kickz</h1>
                </div>
            </div>
        </div>
        <SneakersContextProvider>
        <SneakerListing sneakersList={sneakers}  toggleMobileFilters={toggleMobileFilters} mobileFiltersOpen={mobileFiltersOpen} />
        </SneakersContextProvider></>
  )
}
