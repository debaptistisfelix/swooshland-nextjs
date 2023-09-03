"use client"

import { useState, useEffect, useRef } from 'react'
import styles from './Gallery.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'

export default function Gallery({item }) {
  const [mainImage, setMainImage] = useState(null)
  const [zommedImg, setZommedImg] = useState(false)
  
  const refElement = useRef(null);
 

  useEffect(() => {
      if(item !== null){
        setMainImage(item.images[0])
      } 
  }, [item])




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
   <>
    <section className={`${styles.galleryBox} ${item?.images.length === 1 && styles.oneImageGalleryBox}`}>
    {item && item.images.length > 1 && <section className={styles.smallImagesBox}>
        {item !== null && item?.images.map((img, i) =>{
          return <div className={styles.smallImgBox} key={uuidv4()}>
            <Image
            onClick={() => setAsMainImage(img)}
            className={`${styles.smallImg} ${mainImage === img && styles.active}`} alt="small-image" fill={true} src={`/${img}`} />
          </div>
        })}
    </section>}
    <section className={`${styles.mainImageBox} ${item?.images.length === 1 && styles.oneImageMainImageBox}`}>
    <FontAwesomeIcon  onClick={() => setZommedImg(true)} className={styles.zoomIcon} icon={faMagnifyingGlassPlus} />
        <Image
        ref={refElement}
         onClick={() => setZommedImg(true)}
        className={styles.mainImg} alt="main-image" fill={true} src={`/${mainImage}`} />
       {item && item.onSale === true &&  <div className={styles.discountTag}>-{item.discountPercentage}%</div>}
    </section>
   {zommedImg &&  <div className={styles.shader}>
          <div className={styles.fullscreenImgBox}>
            <Image className={styles.fullscreenImg} alt="main-image" fill={true} src={`/${mainImage}`} />
            <FontAwesomeIcon onClick={() => setZommedImg(false)} className={styles.closeIcon} icon={faX} />
           
          </div>
        
        </div>}
</section>
   </>
  )
}


