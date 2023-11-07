"use client"

import styles from './ItemSection.module.css'
import MainBannerItem from '@app/components/ItemPage/SingleItemPage/MainBannerItem/MainBannerItem'
import RelatedSection from '@app/components/ItemPage/SingleItemPage/RelatedSection/RelatedSection'
import ReviewSection from '@app/components/ItemPage/SingleItemPage/ReviewsSection/ReviewSection'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import getItemData from '@app/libs/FetchingData/FetchingSinglItemData/FetchingSingleItem/fetchItem'
import getItemRelated from '@app/libs/FetchingData/FetchingSinglItemData/fetchItemRelated'
import { useState, useEffect } from 'react'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { poppins } from '@app/fonts'
import { useParams } from 'next/navigation'
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError'

export default function ItemSection() {
  const [itemReviews, setItemReviews] = useState(null)
  const [itemFetchingState, setItemFetchingState] = useState({
    isLoading: true,
    isError: false,
  })
  const [category, setCategory] = useState(null)
  const [item, setItem] = useState(null)
  const [relatedSneakers, setRelatedSneakers] = useState(null)
  const params = useParams()
  const { id } = params

  const filterItemReviewsAfterDeletingOne = (reviewId) => {
    setItemReviews((prevState) => prevState.filter(review => review.id !== reviewId))
  }
   
    const [isLoading, setIsLoading] = useState({
      updatingReviews: false,
      updatingFavoriteState: false,
    })

    const fetchItem = async () => {
      try {
        setItemFetchingState({
          isLoading: true,
          isError: false,
        })
        const data = await getItemData(id);
        setItem(data);
        setItemFetchingState({
          isLoading: false,
          isError: false,
        })
      } catch (error) {
        console.log(error);
        setItemFetchingState({
          isLoading: false,
          isError: true,
        })
      }
    }

 
    
    console.log("item: ", item)
   
  
    const setLoading = (key, value) => {
      setIsLoading((prevState) => ({ ...prevState, [key]: value }))
    }

    useEffect(()=>{
      window.scrollTo(0, 0);
     
    },[]);

    useEffect(()=>{
      if(item !== null){
        setCategory(item.tag)
        setItemReviews(item.reviews)
      }
    },[item]);

    useEffect(() => {
      if (item === null) {
        fetchItem();
      }
    }, [item]);

    

  

  return (
    <main className={`${styles.itemPage} ${poppins.className}`}>
        {itemFetchingState.isLoading === true && itemFetchingState.isError === false && item === null && <ThreeCirclesLoader />}
        {itemFetchingState.isError === true && itemFetchingState.isLoading === false && item === null &&  <div className={styles.errorContainer}>
        <FetchingDataError />
        </div>}
      {itemFetchingState.isLoading === false && itemFetchingState.isError === false && item !== null && <>
      
        {item && category && <BackBtnWithArrow path={`${category === 'sneakers' ? "/sneakers" : "/accessories"}`} text={`Back to ${category} list`} />}
          
     
          {item !== null && itemReviews !== null &&  <MainBannerItem item={item} itemReviews={itemReviews} isLoading={isLoading} setLoading={setLoading}  />}
        
         
          {item !== null && <RelatedSection id={item?.id} />}
          
          {item && itemReviews &&  <ReviewSection item={item} itemReviews={itemReviews} filterItemReviewsAfterDeletingOne={filterItemReviewsAfterDeletingOne} isLoading={isLoading} setLoading={setLoading} />}</>}
          
       
        
    </main>
  )
}
