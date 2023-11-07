import styles from "./MainImageContainer.module.css";
import Image from "next/image";
import {  faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageLoader from "../ImageLoader/ImageLoader";
import { faMagnifyingGlassPlus} from '@fortawesome/free-solid-svg-icons'

export default function MainImageContainer({ isLoading, item, currentIndex, openFullScreen, handleTouchEnd, handleTouchStart, handleNextImage, handlePrevImage, totalImages}) {
  return (
    <section className={`${styles.mainImageBox} ${item?.images.length === 1 && styles.oneImageMainImageBox}`}>
        <FontAwesomeIcon onClick={()=>{openFullScreen(currentIndex)}}   className={styles.zoomIcon} icon={faMagnifyingGlassPlus} />
        <img
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onClick={()=> {openFullScreen(currentIndex)}}
            className={styles.mainImg} alt="main-image"  src={`/${item?.images[currentIndex]}`} />
          {item && item.onSale === true &&  <div className={styles.discountTag}>-{item.discountPercentage}%</div>}
      {totalImages > 1 &&  <>
              <FontAwesomeIcon onClick={handlePrevImage}  className={`${styles.navIconMainImage} ${styles.leftNavIcon}`} icon={faCaretLeft} />
              <FontAwesomeIcon onClick={handleNextImage}  className={`${styles.navIconMainImage} ${styles.rightNavIcon}`} icon={faCaretRight} />
              </>}
    </section>
  )
}
