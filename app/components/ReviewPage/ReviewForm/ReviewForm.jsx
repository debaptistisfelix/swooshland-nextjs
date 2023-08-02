"use client"

import styles from './ReviewForm.module.css'
import { poppins } from '@app/fonts'
import { useState } from 'react'
import CustomSelect from '@app/components/Reusables/CustomSelect/CustomSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function ReviewForm() {
    const [selectedRating, setSelectedRating] = useState(5)
    const selectOptions = {options: [1, 2, 3, 4, 5]}
  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <form className={styles.form}>
            <label className={styles.label} htmlFor="reviewText">Your review:</label>
            <textarea className={styles.textarea} name="reviewText" id="reviewText"></textarea>
            <label className={styles.label} htmlFor="rating">Rating:</label>
            <div className={styles.ratingBox}>
               <div className={styles.selectBox}>
               <CustomSelect selectOptions={selectOptions} selectedOption={selectedRating} handleOptionChange={setSelectedRating} position="right" />
               </div>
                <FontAwesomeIcon className={styles.icon} icon={faStar} />
            </div>
            <button className={styles.button}>Post Review</button>
        </form>
    </main>
  )
}
