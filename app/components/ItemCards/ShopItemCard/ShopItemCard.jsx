"use client"

import styles from './ShopItemCard.module.css';
import { poppins } from '@app/fonts';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
      for(let i = 0; i < rating; i++){
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
                <Image className={styles.image} src={`/${sneaker.images[0]}`} alt="shoe" fill={true}  />
                {sneaker.onSale === true &&  <h3 className={styles.discountTag}>-{sneaker.discountPercentage}%</h3>}
                <div /* style={{opacity: isHovered === true ? 1 : 0}} */ className={styles.shader}>
                    <Link className={`Link ${styles.shopLink}`} href={`/item/${sneaker.id}`}>Shop</Link>
                </div>
            </div>
           <div   className={styles.mobileImgBox}>
                <Link className={`Link ${styles.mobileShopLink}`} href={`/item/${sneaker.id}`}>
                <Image className={styles.image} src={`/${sneaker.images[0]}`} alt="shoe" fill={true}  />
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
