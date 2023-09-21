"use client"

import styles from './TextBlock.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart, faStarHalf, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import SizeTableContainer from './SizeTable/SizeTableContainer'
import { useState, useContext, useEffect, useCallback } from 'react'
import { CartContext } from '@app/context/CartContext'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function TextBlock({item, itemReviews, isLoading, setLoading}) {
    const {name, model,  price, onSale, discountPercentage, description, gender, ratingsAverage, ratingsQuantity, id, } = item;
    const {data: session, status} = useSession();
    const router = useRouter();
    const {addItemToCartItems, isCartLoading, addToFavorites, setCartLoading} = useContext(CartContext);

    useEffect(()=>{
setCartLoading("updatingFavoriteState", false)
setCartLoading("addingItemToCartItems", null)
    },[])
  

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

  
   
    const calculateRatingsAverage = useCallback(() => {
        let total = 0;
        if(itemReviews.length === 0){
            return 0;
        }
        for(let i = 0; i < itemReviews.length; i++){
            total += itemReviews[i].rating;
        }
        const newRAtingsAverage = (total / itemReviews.length).toFixed(1);
        if(newRAtingsAverage === "NaN"){
            return 0;
        } else {
            return newRAtingsAverage;
        }
    }, [itemReviews])

  

  console.log(itemReviews)

  return (
    <section className={`${styles.textBox} ${item?.images.length === 1 && styles.oneImageTextBox}`}>
            <div className={styles.titleBox}>
                <div className={styles.headerBox}>
                <h1 className={styles.title}>{model}</h1>
                <h3 className={styles.gender}>{
                    gender === "Men" ? "MNS" : "WMNS"
                }</h3>
                </div>
                <h3 className={styles.name}>{name}</h3>
                <div className={styles.reviewBox}>
                    <div className={styles.starBox}>
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <div className={styles.fullStarBox}>
                {GiveStars(calculateRatingsAverage())}
                </div>
                    </div>
                    <p className={styles.reviewCount}>({calculateRatingsAverage()}/5, out of  {itemReviews?.length} reviews)</p>
                </div>
            </div>
            <div className={styles.priceBox}>
                <h2 className={styles.price}>
                    {onSale === false ? `$${price.toFixed(2)}` : `$${(price - (price * discountPercentage / 100)).toFixed(2)}`}
                </h2>
                {onSale === true && <div className={styles.discountBox}>
                <h2 className={styles.fullPrice}>${price.toFixed(2)}</h2>
                <div className={styles.line}></div>
                </div>}

            </div>
            <p className={styles.description}>
                {description}
            </p>

            <SizeTableContainer item={item} />  

            <section className={styles.btnBox}>
                <button
                disabled={isCartLoading.addingItemToCartItems === true || isCartLoading.addingItemToCartItems === false}
                onClick={()=>{
                    addItemToCartItems(id);
                }} className={styles.addBtn}>
                    
                    Add to Cart
                   <div className={`${styles.cartAnimationContainer}  ${isCartLoading.addingItemToCartItems === true && styles.cartAnimationBeginning}  ${isCartLoading.addingItemToCartItems === false && styles.cartAnimationEnding}`}>
                    <p className={styles.cartAnimationText}>Adding to Cart</p>
                    <FontAwesomeIcon icon={faCartShopping} className={`${styles.cart} ${isCartLoading.addingItemToCartItems === true && styles.active}`} />
                   </div>
                    </button>
                <button onClick={()=>{
                    if(session === null){
                        router.push("/login");
                    } else {
                        addToFavorites(item);
                    }
                    
                }} className={styles.heartBtn}>
                    <FontAwesomeIcon icon={faHeart} className={`${styles.heart}  ${isCartLoading.updatingFavoriteState === true && styles.active}`} />
                </button>
            </section>
        </section>
  )
}
