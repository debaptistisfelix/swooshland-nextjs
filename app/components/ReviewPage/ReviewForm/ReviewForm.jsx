"use client"

import styles from './ReviewForm.module.css'
import { poppins } from '@app/fonts'
import { useState } from 'react'
import CustomSelect from '@app/components/Reusables/CustomSelect/CustomSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function ReviewForm({changeReviewSubmittedStatus, setLoading}) {
    const [selectedRating, setSelectedRating] = useState(5)
    const [reviewText, setReviewText] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    const selectOptions = {options: [1, 2, 3, 4, 5]}
    const params = useParams();
    const {itemId} = params;

  

    const handleTextAreaChange = (e) => {
        setReviewText(e.target.value);
    }

    const handleTitleChange = (e) => {
        setReviewTitle(e.target.value);
    }
    

    const submitReview = async (e) => {
        e.preventDefault();
       if(reviewText !== "" && reviewTitle !== ""){
        try{
          setLoading("submittingReview", true)
          const response = await fetch(`/api/review/${itemId}/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              comment: reviewText,
              title: reviewTitle,
              rating: selectedRating
            }),
          });
          const data = await response.json();
   
          setLoading("submittingReview", false)
          toast.success("Review Posted",  {
            style: {
                backgroundColor: "#2fbf71",
                color: "#fff",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#2fbf71",
            },
        })
          changeReviewSubmittedStatus(true)
       
         }
         catch(error){
             console.log(error)
             setLoading("submittingReview", false)
             toast.error("Error while posting review. Retry in a few minutes.",  {
              style: {
                  backgroundColor: "#d00000",
                  color: "#fff",
              },
              iconTheme: {
                  primary: "#fff",
                  secondary: "#d00000",
              },
          })
         }
    } else {
      toast.error("Please fill out all fields",  {
        style: {
            backgroundColor: "#d00000",
            color: "#fff",
        },
        iconTheme: {
            primary: "#fff",
            secondary: "#d00000",
        },
    })
    }
  }


  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <form onSubmit={submitReview} className={styles.form}>
        <label className={styles.label} htmlFor="reviewText">Your review Title:</label>
        <input onChange={handleTitleChange} value={reviewTitle} className={`input ${styles.reviewInput}`} ></input>
            <label className={styles.label} htmlFor="reviewText">Your review:</label>
            <textarea onChange={handleTextAreaChange} value={reviewText} className={styles.textarea} name="reviewText" id="reviewText"></textarea>
            <label className={styles.label} htmlFor="rating">Rating:</label>
            <div className={styles.ratingBox}>
               <div className={styles.selectBox}>
               <CustomSelect selectOptions={selectOptions} selectedOption={selectedRating} handleOptionChange={setSelectedRating} position="right" />
               </div>
                <FontAwesomeIcon className={styles.icon} icon={faStar} />
            </div>
            <button type="submit" className={styles.button}>Post Review</button>
        </form>
    </main>
  )
}
