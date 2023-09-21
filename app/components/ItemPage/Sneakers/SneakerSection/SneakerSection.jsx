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
import SneakerBanner from '@/public/kraken.jpg';


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
            <Image priority={true}
            placeholder='blur'
            sizes="(min-width: 620px) 90vw, 100vw"
            srcSet="
		/_next/image?url=%2Fkraken.jpg&w=640&q=75 640w,
		/_next/image?url=%2Fkraken.jpg&w=750&q=75 750w,
		/_next/image?url=%2Fkraken.jpg&w=828&q=75 828w,
		/_next/image?url=%2Fkraken.jpg&w=1080&q=75 1080w,
		/_next/image?url=%2Fkraken.jpg&w=1200&q=75 1200w,
		/_next/image?url=%2Fkraken.jpg&w=1920&q=75 1920w,
		/_next/image?url=%2Fkraken.jpg&w=2048&q=75 2048w,
		/_next/image?url=%2Fkraken.jpg&w=3840&q=75 3840w
	"
            alt="nikeaf1" fill="true" className={styles.image} src={SneakerBanner} />
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
