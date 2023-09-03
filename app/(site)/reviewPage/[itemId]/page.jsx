"use client"

import styles from './page.module.css'
import { poppins } from '@app/fonts'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import ReviewItemCard from '@app/components/ItemCards/ReviewItemCard/ReviewItemCard'
import ReviewSubmitted from '@app/components/ReviewPage/ReviewSubmitted/ReviewSubmitted'
import { useState } from 'react'
import ReviewForm from '@app/components/ReviewPage/ReviewForm/ReviewForm'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'

export default function page() {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState({
    submittingReview: false,
  })

  const setLoading = (key, value) => {
    setIsLoading((prevState) => ({ ...prevState, [key]: value }))
  }

  const changeReviewSubmittedStatus = (value) => {
    setReviewSubmitted(value);
  }

  return (
    <main className={`pageContainer ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Shop" />
        <section  className={`pageContent ${styles.reviewPostSection}`}>
          <div className={styles.card}>
            <h1 className={styles.title}>Leave Your Review</h1>
            <p className={styles.parag}>
            Item to review:
            </p>
            <ReviewItemCard />
            {isLoading.submittingReview === true && <ThreeCirclesLoader />}
           {reviewSubmitted === true && isLoading.submittingReview === false &&  <ReviewSubmitted />}
           {reviewSubmitted === false && isLoading.submittingReview === false && <ReviewForm setLoading={setLoading} changeReviewSubmittedStatus={changeReviewSubmittedStatus} />}
          </div>
        </section>
    </main>
  )
}
