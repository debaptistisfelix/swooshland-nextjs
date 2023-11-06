import styles from "./MainImageContainer.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageLoader from "../ImageLoader/ImageLoader";
import { faMagnifyingGlassPlus} from '@fortawesome/free-solid-svg-icons'

export default function MainImageContainer({ item, currentIndex, openFullScreen, handleTouchEnd, handleTouchStart, }) {
  return (
    <section className={`${styles.mainImageBox} ${item?.images.length === 1 && styles.oneImageMainImageBox}`}>
        <FontAwesomeIcon onClick={()=>{openFullScreen(currentIndex)}}   className={styles.zoomIcon} icon={faMagnifyingGlassPlus} />
        <ImageLoader />
        <Image
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onClick={()=> {openFullScreen(currentIndex)}}
          onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
            priority={true}
            className={styles.mainImg} alt="main-image" fill={true} src={`/${item?.images[currentIndex]}`} />
          {item && item.onSale === true &&  <div className={styles.discountTag}>-{item.discountPercentage}%</div>}
    </section>
  )
}
