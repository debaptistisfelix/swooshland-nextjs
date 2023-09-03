"use client"

import styles from './page.module.css'
import { poppins } from '@app/fonts'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import MainBannerItem from '@app/components/ItemPage/SingleItemPage/MainBannerItem/MainBannerItem'
import RelatedSection from '@app/components/ItemPage/SingleItemPage/RelatedSection/RelatedSection'
import ReviewSection from '@app/components/ItemPage/SingleItemPage/ReviewsSection/ReviewSection'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import { usePathname, useParams, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'

export default function page() {
  const params = useParams()
  const {id} = params;
  const [isLoading, setIsLoading] = useState({
    fetchingItem: true,
    updatingReviews: false,
    updatingFavoriteState: false,
  })
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("")


  const setLoading = (key, value) => {
    setIsLoading((prevState) => ({ ...prevState, [key]: value }))
  }

  const somethingIsLoading = Object.values(isLoading).some((val) => val === true)

  const [item, setItem] = useState(null)
       
  useEffect(()=>{
   fetchitem();
  },[])

   const fetchitem = async ()=>{
      if(id){
        try{
          const response = await fetch(`/api/item/${id}`);
          const data = await response.json();
          setItem(data);
          setCategory(data.tag)
          setLoading("fetchingItem", false) 
          setError(false)
        } catch(error){
          console.log(error)
          setLoading("fetchingItem", false) 
          setError(true);
        }
      }
   }

   console.log(isLoading, error)

 

  return (
    <main className={`${styles.itemPage} ${poppins.className}`}>
         <BackBtnWithArrow path={`${category === 'sneakers' ? "/sneakers" : "/accessories"}`} text={`Back to ${category} list`} />
            {isLoading.fetchingItem === true && error === false && <ThreeCirclesLoader />  }

            {isLoading.fetchingItem === false && error === false && <>
            <MainBannerItem item={item} isLoading={isLoading} setLoading={setLoading}  />
         
            <RelatedSection />
            <ReviewSection item={item} isLoading={isLoading} setLoading={setLoading} />
            </>}

            {isLoading.fetchingItem === false && error === true && <div className={styles.errorBox}>
              <FontAwesomeIcon icon={faCircleExclamation} className={styles.errorIcon} />
              <p className={styles.errorText}>
              Network Error. Please refresh the page.
              </p>
              </div>}
    </main>
  )
}
