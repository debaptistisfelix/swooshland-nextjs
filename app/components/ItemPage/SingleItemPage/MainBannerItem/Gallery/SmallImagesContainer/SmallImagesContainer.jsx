import styles from "./SmallImagesContainer.module.css";

import React from 'react'

export default function SmallImagesContainer({item, handleImageChange, currentIndex}) {
  return (
    <section className={styles.smallImagesBox}>
    {item !== null && item?.images.map((img, i) =>{
      return <div  key={i} className={`${styles.smallImgBox} ${currentIndex === i && styles.active}`}>
        <img
      className={styles.smallImg}
        src={`/${img}`}
        alt={`Small Image ${i}`}
        onClick={() => handleImageChange(img, i)}
      /> 
      </div>
    })}
</section>
  )
}
