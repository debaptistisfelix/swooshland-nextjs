"use client"

import { useState, useEffect, useRef } from 'react'
import styles from './Gallery.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faMagnifyingGlassPlus, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import ImageLoader from '@app/components/Reusables/ImageLoader/ImageLoader'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'


export default function Gallery({item }) {
  const [mainImage, setMainImage] = useState(null)
  const [zommedImg, setZommedImg] = useState(false)
  const [currentZommedImageIndex, setCurrentZommedImageIndex] = useState(0)
 const totalImages = item?.images?.length || 0;
  
  const refElement = useRef(null);

  const showNextImage = () => {
    setCurrentZommedImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };
  
  const showPreviousImage = () => {
    setCurrentZommedImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };
 
 

  useEffect(() => {
      if(item !== null){
        setMainImage(item.images[0], 0)
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

  const setAsMainImage = (img, index) => {
    setMainImage(img)
    setCurrentZommedImageIndex(index);
  }

  
  return (
   <>
    <section className={`${styles.galleryBox} ${item?.images?.length === 1 && styles.oneImageGalleryBox}`}>
    {item && item.images.length > 1 && <section className={styles.smallImagesBox}>
        {item !== null && item?.images.map((img, i) =>{
          return <div className={styles.smallImgBox} key={uuidv4()}>
            <ImageLoader />
           <Image
          onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
            onClick={() => setAsMainImage(img, i)}
            className={`${styles.smallImg} ${mainImage === img && styles.active}`} alt="small-image" fill={true} src={`/${img}`} />
          </div>
        })}
    </section>}
    <section className={`${styles.mainImageBox} ${item?.images.length === 1 && styles.oneImageMainImageBox}`}>
    <FontAwesomeIcon  onClick={() => setZommedImg(true)} className={styles.zoomIcon} icon={faMagnifyingGlassPlus} />
    <ImageLoader />
        <Image
      onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
        priority={true}
         onClick={() => setZommedImg(true)}
        className={styles.mainImg} alt="main-image" fill={true} src={`/${mainImage}`} />
       {item && item.onSale === true &&  <div className={styles.discountTag}>-{item.discountPercentage}%</div>}
    </section>
   {zommedImg &&  <div className={styles.shader}>
          <div className={styles.fullscreenImgBox} ref={refElement}>
            <Image  className={styles.fullscreenImg} alt="main-image" fill={true} src={`/${item?.images[currentZommedImageIndex]}`} />
            <FontAwesomeIcon onClick={() => setZommedImg(false)} className={styles.closeIcon} icon={faX} />

           <div className={styles.navBox} >
          <FontAwesomeIcon onClick={showPreviousImage}  className={styles.navIcon} icon={faCaretLeft} />
          <p onClick={showPreviousImage} className={styles.navParag}>
          <FontAwesomeIcon  className={styles.mobileNavIcon} icon={faCaretLeft} />
          Prev</p>
          <div className={styles.mobileGalleryCount}>{currentZommedImageIndex + 1}/{totalImages}</div>
          <p onClick={showNextImage} className={styles.navParag}>Next
          <FontAwesomeIcon  className={styles.mobileNavIcon} icon={faCaretRight} /></p>
          <FontAwesomeIcon onClick={showNextImage}  className={styles.navIcon} icon={faCaretRight} />
           </div>

           <div className={styles.galleryCount}>{currentZommedImageIndex + 1}/{totalImages}</div>
          </div>
        
        </div>}
</section>
   </>
  )
}


