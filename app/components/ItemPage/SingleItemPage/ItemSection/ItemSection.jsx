"use client"

import styles from './ItemSection.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import MainBannerItem from '@app/components/ItemPage/SingleItemPage/MainBannerItem/MainBannerItem'
import RelatedSection from '@app/components/ItemPage/SingleItemPage/RelatedSection/RelatedSection'
import ReviewSection from '@app/components/ItemPage/SingleItemPage/ReviewsSection/ReviewSection'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'

import { useState, useEffect } from 'react'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { poppins } from '@app/fonts'


export default async function ItemSection({item, relatedPromise}) {
  const {reviews} = item;
  const [itemReviews, setItemReviews] = useState(reviews)

  const filterItemReviewsAfterDeletingOne = (reviewId) => {
    setItemReviews((prevState) => prevState.filter(review => review.id !== reviewId))
  }
   
    const [isLoading, setIsLoading] = useState({
      updatingReviews: false,
      updatingFavoriteState: false,
    })
    const [category, setCategory] = useState("")
  
   
  
    const setLoading = (key, value) => {
      setIsLoading((prevState) => ({ ...prevState, [key]: value }))
    }

    useEffect(()=>{
      window.scrollTo(0, 0);
      setCategory(item.tag)
    },[]);

    

  

  return (
    <main className={`${styles.itemPage} ${poppins.className}`}>
         <BackBtnWithArrow path={`${category === 'sneakers' ? "/sneakers" : "/accessories"}`} text={`Back to ${category} list`} />
          
     
            <MainBannerItem item={item} itemReviews={itemReviews} isLoading={isLoading} setLoading={setLoading}  />
         
          
           <RelatedSection relatedPromise={relatedPromise}/>
           
            <ReviewSection item={item} itemReviews={itemReviews} filterItemReviewsAfterDeletingOne={filterItemReviewsAfterDeletingOne} isLoading={isLoading} setLoading={setLoading} />
          
       
        
    </main>
  )
}
