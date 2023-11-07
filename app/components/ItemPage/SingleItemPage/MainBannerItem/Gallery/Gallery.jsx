"use client"

import { useState, useEffect, useRef, useContext } from 'react'
import styles from './Gallery.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCaretLeft, faCaretRight, faImage } from '@fortawesome/free-solid-svg-icons'
import MainImageContainer from './MainImageContainer/MainImageContainer'
import SmallImagesContainer from './SmallImagesContainer/SmallImagesContainer'
import { TouchContext } from '@app/context/TouchContext'

export default function Gallery({item }) {
  const { touchEnd, handleTouchStart, handleTouchEnd, handleSwipe} = useContext(TouchContext);

  const totalImages = item?.images?.length || 0;

  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
  const refElement = useRef(null);



  useEffect(()=>{
     if(item?.images.length > 1){
      handleSwipe(handlePrevImage, handleNextImage)
     }
  }, [touchEnd]) 




  useEffect(() => {
    const handleClickOutside = (e) => {
        if(refElement.current && !refElement.current.contains(e.target)){
          closeFullScreen();
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
}, [])



const handleImageChange = (img, index) => {
  setCurrentIndex(index);
}



const openFullScreen = (index) => {
  // Check if the clicked index is the same as the current index
 if (index === currentIndex) {
   setIsLoading(false); // Reset loading state
 } else {
   setIsLoading(true); // Set loading state for a new image
   setCurrentIndex(index);
 }
 setIsFullscreenOpen(true);
 };


 const closeFullScreen = () => {
   setIsFullscreenOpen(false);
 };

 
 const handlePrevImage = () => {
   event.stopPropagation();
   setCurrentIndex((prevIndex) => (prevIndex === 0 ? item?.images.length - 1 : prevIndex - 1));
 };

 const handleNextImage = () => {
   event.stopPropagation();
   setCurrentIndex((prevIndex) => (prevIndex === item?.images.length - 1 ? 0 : prevIndex + 1));
 };

 useEffect(() => {
  if(item !== null && item?.images !== null){
    setIsLoading(true);
    const image = new Image();
    image.src = item?.images[currentIndex]
    image.onload = () => {
      setIsLoading(false);
    };

  }
}, [currentIndex]);


  return (
   <>
    <section className={`${styles.galleryBox} ${item?.images?.length === 1 && styles.oneImageGalleryBox}`}>
    {item && item.images.length > 1 && <SmallImagesContainer currentIndex={currentIndex} item={item} handleImageChange={handleImageChange} />}

    {item && item.images.length >= 1 &&<MainImageContainer isLoading={isLoading} item={item} currentIndex={currentIndex}  openFullScreen={openFullScreen} handleTouchEnd={handleTouchEnd} handleTouchStart={handleTouchStart} handleNextImage={handleNextImage} handlePrevImage={handlePrevImage} totalImages={totalImages} />}
   
      {isFullscreenOpen &&  <div className={styles.shader}>
              <div className={styles.fullscreenImgBox} ref={refElement}>
              
   
            <img onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd} className={styles.fullscreenImg} alt="main-image" src={`/${item?.images[currentIndex]}`} />
                <FontAwesomeIcon onClick={closeFullScreen} className={styles.closeIcon} icon={faX} />

              {totalImages > 1 &&  <div className={styles.navBox} >
              <FontAwesomeIcon onClick={handlePrevImage}  className={styles.navIcon} icon={faCaretLeft} />
              <p onClick={handlePrevImage} className={styles.navParag}>
              <FontAwesomeIcon  className={styles.mobileNavIcon} icon={faCaretLeft} />
              Prev</p>
              <div className={styles.mobileGalleryCount}>{currentIndex + 1}/{totalImages}</div>
              <p onClick={handleNextImage} className={styles.navParag}>Next
              <FontAwesomeIcon  className={styles.mobileNavIcon} icon={faCaretRight} /></p>
              <FontAwesomeIcon onClick={handleNextImage}  className={styles.navIcon} icon={faCaretRight} />
              </div>}

              <div className={styles.galleryCount}>{currentIndex + 1}/{totalImages}</div>
              </div>
            
            </div>}
    </section>
   </>
  )


}


