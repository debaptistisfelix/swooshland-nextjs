"use client"

import styles from './TextBlock.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart, faStarHalf, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import SizeTableContainer from './SizeTable/SizeTableContainer'
import { useState, useContext } from 'react'
import { CartContext } from '@app/context/CartContext'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function TextBlock({item, isLoading, setLoading}) {
    const {name, model,  price, onSale, discountPercentage, description, gender, ratingsAverage, ratingsQuantity, id} = item;
    const {data: session, status} = useSession();
    const router = useRouter();
    const {addItemToCartItems, isCartLoading} = useContext(CartContext);
  

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

    const [isFavorited, setIsFavorited] = useState(false);

   

  

    const addToFavorites = async () => {
        setLoading("updatingFavoriteState", true);
        try{
            const response = await fetch(`/api/wishlistItem/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    itemId: item.id,
                }),
            })
            const data = await response.json();
            console.log(data);
            if(response.status === 200){
                setIsFavorited(true);
                setLoading("updatingFavoriteState", false);
                toast.success("Added to favorites", {
                    style: {
                        backgroundColor: "#191919",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#191919",
                    },
                })
            } else if(response.status === 400){
                setIsFavorited(false);
                setLoading("updatingFavoriteState", false);
                toast.error("Already added to Favorites previously", {
                    style: {
                        backgroundColor: "#191919",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#191919",
                    },
                })
            }
        } catch(error){
            console.log(error)
          setLoading("updatingFavoriteState", false); 
            toast.error("Error while adding to wishlist. Retry again.", {
                style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
            })
        }
    }



  

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
                {GiveStars(ratingsAverage)}
                </div>
                    </div>
                    <p className={styles.reviewCount}>({ratingsAverage}/5, {ratingsQuantity} reviews)</p>
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
                    <FontAwesomeIcon icon={faCartShopping} className={`${styles.cart} ${isLoading.addingToCart === true && styles.active}`} />
                   </div>
                    </button>
                <button onClick={()=>{
                    if(session === null){
                        router.push("/login");
                    } else {
                        addToFavorites();
                    }
                    
                }} className={styles.heartBtn}>
                    <FontAwesomeIcon icon={faHeart} className={`${styles.heart}  ${isLoading.updatingFavoriteState === true && styles.active}`} />
                </button>
            </section>
        </section>
  )
}
