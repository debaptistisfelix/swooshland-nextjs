"use client"
import styles from './AccessoriesSection.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import getItemsListData from '@app/libs/FetchingData/FetchItemsListData/fetchItemsListData'
import AccessoriesContextProvider from '@app/context/AccessoriesContext'
import AccessoriesListing from '@app/components/ItemPage/Accessories/AccessoriesListing/AccessoriesListing'
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError'
import AccessoriesBanner from '@/public/walletSu.jpg';
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'

export default function AccessoriesSection() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [accessoriesLoadingState, setAccessoriesLoadingState] = useState({
        isLoading: true,
        isError: false,
    });

    const fetchAccessories = async () => {
      try {
        setAccessoriesLoadingState({
          isLoading: true,
          isError: false,
        })
        const data = await getItemsListData("accessories");
        setAccessories(data)
        setAccessoriesLoadingState({
          isLoading: false,
          isError: false,
        })
      } catch (error) {
        console.log(error)
        setAccessoriesLoadingState({
          isLoading: false,
          isError: true,
        })
      }
    }

    useEffect(()=>{
      fetchAccessories()
    },[])


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
        {accessoriesLoadingState.isError === true && accessoriesLoadingState.isLoading === false && <div className={styles.errorContainer}>
          <FetchingDataError/></div>}
        {accessoriesLoadingState.isLoading === true && accessoriesLoadingState.isError === false && <ThreeCirclesLoader />}
        <AccessoriesContextProvider>
         {accessories && accessories.length > 0 && accessoriesLoadingState.isError === false && accessoriesLoadingState.isLoading=== false &&  <AccessoriesListing accessoriesList={accessories}  mobileFiltersOpen={mobileFiltersOpen} toggleMobileFilters={toggleMobileFilters} />}
        </AccessoriesContextProvider>
          </>
  )
}
