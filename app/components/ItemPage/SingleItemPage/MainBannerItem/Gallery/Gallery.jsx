"use client"

import { useState, useEffect, useRef } from 'react'
import styles from './Gallery.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';

export default function Gallery() {
  const [mainImage, setMainImage] = useState("lust1.jpg")
  const [zommedImg, setZommedImg] = useState(false)
  const refElement = useRef(null);
  const images = [
    "lust1.jpg",
    "lust2.jpg",
    "lust3.jpg",
    "lust4.jpg",
    "lust5.jpg",
    "lust6.jpg",
    "lust7.jpg",
    "lust8.jpg",
    "lust9.jpg",
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
        if(refElement.current && !refElement.current.contains(e.target)){
          setZommedImg(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
}, [])

  const setAsMainImage = (img) => {
    setMainImage(img)
  }
  return (
    <section className={styles.galleryBox}>
    <section className={styles.smallImagesBox}>
        {images.map((img, i) =>{
          return <div className={styles.smallImgBox} key={uuidv4()}>
            <Image
            onClick={() => setAsMainImage(img)}
            className={`${styles.smallImg} ${mainImage === img && styles.active}`} alt="small-image" fill={true} src={`/${img}`} />
          </div>
        })}
    </section>
    <section className={styles.mainImageBox}>
    <FontAwesomeIcon  onClick={() => setZommedImg(true)} className={styles.zoomIcon} icon={faMagnifyingGlassPlus} />
        <Image
        ref={refElement}
         onClick={() => setZommedImg(true)}
        className={styles.mainImg} alt="main-image" fill={true} src={`/${mainImage}`} />
        <div className={styles.discountTag}>-30%</div>
    </section>
   {zommedImg &&  <div className={styles.shader}>
          <div className={styles.fullscreenImgBox}>
            <Image className={styles.fullscreenImg} alt="main-image" fill={true} src={`/${mainImage}`} />
            <FontAwesomeIcon onClick={() => setZommedImg(false)} className={styles.closeIcon} icon={faX} />
           
          </div>
        
        </div>}
</section>
  )
}


