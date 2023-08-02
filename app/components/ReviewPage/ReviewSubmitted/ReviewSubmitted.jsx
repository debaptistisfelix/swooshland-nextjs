import styles from './ReviewSubmitted.module.css'
import { poppins } from '@app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

export default function ReviewSubmitted() {
  return (
    <main className={`${styles.section} ${poppins.className}`}>
       <div className={styles.titleBox}>
            <FontAwesomeIcon className={styles.icon} icon={faClipboardCheck} />
            <h1 className={styles.title}>Thank you for your Review!</h1>
       </div>
       <p className={styles.parag}>Your Review was posted on the item pgae. </p>
    </main>
  )
}
