"use client"

import styles from './ShopItemCard.module.css';
import { poppins } from '@app/fonts';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf, faShoppingCart, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ImageLoader from '@app/components/Reusables/ImageLoader/ImageLoader';

export default function ShopItemCard({sneaker}) {
  const [isClicked, setIsClicked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(()=>{
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    }
  }, [])

 
  


    const GiveStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStars = (rating - fullStars) >= 0.5;
 
  
      let stars = [];
      for(let i = 0; i < fullStars; i++){
          stars.push(<FontAwesomeIcon key={i}  icon={faStar} className={styles.star} />)
      
      }
  
      if(halfStars){
          stars.push(<FontAwesomeIcon key={rating} icon={faStarHalf} className={styles.star} />)
     
      }
   
      return stars;
  }; 


 

  return (
    <main className={`${styles.section} ${poppins.className}`}>
            <div   className={styles.imgBox}>
           <ImageLoader />
                <Image 
               onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading='lazy'
                className={styles.image} src={`/${sneaker.images[0]}`} alt="shoe" fill={true}  />
                {sneaker.onSale === true &&  <h3 className={styles.discountTag}>-{sneaker.discountPercentage}%</h3>}
                <div /* style={{opacity: isHovered === true ? 1 : 0}} */ className={styles.shader}>
                    <Link className={`Link ${styles.shopLink}`} href={`/item/${sneaker.id}`}>Shop</Link>
                </div>
            </div>
           <div   className={styles.mobileImgBox}>
                <Link className={`Link ${styles.mobileShopLink}`} href={`/item/${sneaker.id}`}>
                <ImageLoader />
                <Image
                onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
                sizes="100vw"
                srcSet="
                  /_next/image?url=%2Flust1.jpg&w=640&q=75 640w,
                  /_next/image?url=%2Flust1.jpg&w=750&q=75 750w,
                  /_next/image?url=%2Flust1.jpg&w=828&q=75 828w,
                  /_next/image?url=%2Flust1.jpg&w=1080&q=75 1080w,
                  /_next/image?url=%2Flust1.jpg&w=1200&q=75 1200w,
                  /_next/image?url=%2Flust1.jpg&w=1920&q=75 1920w,
                  /_next/image?url=%2Flust1.jpg&w=2048&q=75 2048w,
                  /_next/image?url=%2Flust1.jpg&w=3840&q=75 3840w
                "
                loading='lazy'
                className={styles.image} src={`/${sneaker.images[0]}`} alt="shoe" fill={true}  />
                {sneaker.onSale === true &&  <h3 className={styles.discountTag}>-{sneaker.discountPercentage}%</h3>}
                </Link>
                
            </div>
            <div className={styles.text}>
                <h3 className={styles.product}>{sneaker.model}</h3>
                <div className={styles.starBox}>
                   <div className={styles.emptyStarBox}>
                   <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <div className={styles.fullStarBox}>
                {GiveStars(sneaker.ratingsAverage)}
                </div>
                   </div>
                </div>
                
                <h3 className={styles.name}>{sneaker.name}</h3>
                <h3 className={styles.gender}>{sneaker.gender === "Men" ? "MNS" : "WMNS"}</h3>
                <div className={styles.priceBox}>
            <h3 className={`${styles.price} ${sneaker.onSale === true && styles.linethrough}`}>${sneaker.price.toFixed(2)}</h3>
            {sneaker.onSale === true && <h3 className={styles.discountedPrice}>${
                (sneaker.price - (sneaker.price * (sneaker.discountPercentage / 100))).toFixed(2)
            }</h3>}
            </div>
                
            </div>
    </main>
  )
}
