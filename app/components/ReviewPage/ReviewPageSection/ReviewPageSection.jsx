"use client"
import styles from './ReviewPageSection.module.css'
import { poppins } from '@app/fonts'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import ReviewItemCard from '@app/components/ItemCards/ReviewItemCard/ReviewItemCard'
import ReviewSubmitted from '@app/components/ReviewPage/ReviewSubmitted/ReviewSubmitted'
import { useState, useEffect } from 'react'
import ReviewForm from '@app/components/ReviewPage/ReviewForm/ReviewForm'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Login from '@app/components/Authentication/Login/Login'

export default function ReviewPageSection() {
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState({
      submittingReview: false,
      loadingItem: true
    })
    const { itemId } = useParams();
    const [item, setItem] = useState(null)
    const {data: session, status} = useSession();
  
  
  
    const setLoading = (key, value) => {
      setIsLoading((prevState) => ({ ...prevState, [key]: value }))
    }
  
    const changeReviewSubmittedStatus = (value) => {
      setReviewSubmitted(value);
    }
  
    const fetchItem = async () => {
      try {
        setLoading('loadingItem', true)
       const res = await fetch(`http://localhost:3000/api/item/${itemId}`)
       const data = await res.json()
       setItem(data)
       setLoading('loadingItem', false)
      } catch (error) {
       console.log(error)
       setLoading('loadingItem', false)
      }
     }
   
   useEffect(() => {
     fetchItem();
   },[])
  return (
    <>
    {status === "authenticated" && <main className={`pageContainer ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Shop" />
        { isLoading.loadingItem === true && <ThreeCirclesLoader />}

       {isLoading.loadingItem === false && item &&  <section  className={`pageContent ${styles.reviewPostSection}`}>
          <div className={styles.card}>
            <h1 className={styles.title}>Leave Your Review</h1>
            <p className={styles.parag}>
            Item to review:
            </p>
            <ReviewItemCard item={item} />
           {reviewSubmitted === true && isLoading.submittingReview === false &&  <ReviewSubmitted />}
           {reviewSubmitted === false && isLoading.submittingReview === false && <ReviewForm setLoading={setLoading} changeReviewSubmittedStatus={changeReviewSubmittedStatus} />}
          </div>
          {isLoading.submittingReview === true && <ThreeCirclesLoader />}
        </section>}
    </main>}
    {status === "unauthenticated" && <Login />}
    {status === "loading" && <div className="pageContainer">
    <ThreeCirclesLoader /></div>}</>
  )
}
