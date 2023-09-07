"use client"

import styles from './NoSizeCard.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf, faCartShopping, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NoSizeCArd({fav, removeFromFavorites}) {
    const [showDeletModal, setShowDeleteModal] = useState(false)
    const [isClicked, setIsClicked] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const refElement = useRef(null)
    const desktopRefElement = useRef(null)
    const deleteButtonRef = useRef(null)
    const imageRef = useRef(null)
    const {item} = fav;
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (e) => {
           if(windowWidth < 1024){
            if(refElement.current && !refElement.current.contains(e.target)){
                setShowDeleteModal(false);
            }
           } else {
            if(desktopRefElement.current && !desktopRefElement.current.contains(e.target)){
                setShowDeleteModal(false);
            }
           }
        }
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
          }
      

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener('resize', updateWindowWidth);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener('resize', updateWindowWidth);
        }
    }, [])

    useEffect(()=>{
        if(showDeletModal === true) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [showDeletModal])

    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeletModal)
    }

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
   <>
    <main  className={styles.card}>
        <div className={styles.imageBox}>
            <Image className={styles.image} src={`/${item.images[0]}`} alt="jordan-1-rogue" fill={true}  />
            {item.onSale === true &&  <h3 className={styles.discountTag}>-{item.discountPercentage}%</h3>}
          <div className={styles.shade}>
                <div  className={`${styles.button} ${styles.shopBtn}`}>
                   <Link className="Link" href={`/item/${item.id}`}>
                   <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
                   </Link>
                </div>
                <div onClick={()=>{
                    toggleDeleteModal();
                }} className={`${styles.button} ${styles.deleteBtn}`}>
                    <FontAwesomeIcon  className={styles.icon} icon={faTrash} />
                </div>
            </div>
            
        </div>
        <div className={styles.textBox}>
        <h3 className={styles.product}>{item.model}</h3>
            <div className={styles.starBox}>
                <div className={styles.emptyStarBox}>
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <div className={styles.fullStarBox}>
                {GiveStars(item.ratingsAverage)}
                </div>
                </div>
                
            </div>
            <h3 className={styles.name}>{item.name}</h3>
            <h3 className={styles.gender}>{item.gender === "Men" ? "MNS" : "WMNS"}</h3>
            
            <div className={styles.priceBox}>
            <h3 className={`${styles.price} ${item.onSale === true && styles.linethrough}`}>${item.price.toFixed(2)}</h3>
            {item.onSale === true && <h3 className={styles.discountedPrice}>${
                (item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)
            }</h3>}
            </div>
        </div>
        {showDeletModal === true && <div className="modalContainer">
            <div ref={desktopRefElement} className="modal">
                <h1 className="modalTitle">Remove Item</h1>
                <p className="modalParag">Would you like to remove it from your favorites?</p>
                <div className="modalBtnBox">
                    <button onClick={toggleDeleteModal} className="modalButton modalLeftButton">Cancel</button>
                    <button onClick={()=>{
                        setShowDeleteModal(false);
                        removeFromFavorites(fav.id)
                    }
                        } className="modalButton modalRightButton">Remove</button>
                </div>
            </div>
        </div>}
    </main>
    
    
    <section
    onClick={(event)=>{
        if(event.target !== deleteButtonRef.current && event.target === imageRef.current){
            router.push(`/item/${item.id}`)
        }
    }}
    className={` Link ${styles.mobileCard}`}>
        <div className={styles.imageBox}>
            <Image ref={imageRef} className={styles.image} src={`/${item.images[0]}`} alt="jordan-1-rogue" fill={true}  />
            {item.onSale === true &&  <h3 className={styles.discountTag}>-{item.discountPercentage}%</h3>}
          
            <FontAwesomeIcon
            ref={deleteButtonRef}
            onClick={(event)=>{
                event.stopPropagation();
                    toggleDeleteModal();
                }} className={styles.xDelete} icon={faX} />
        </div>
        <div className={styles.textBox}>
        <h3 className={styles.product}>{item.model}</h3>
            <div className={styles.starBox}>
                <div className={styles.emptyStarBox}>
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <div className={styles.fullStarBox}>
                {GiveStars(item.ratingsAverage)}
                </div>
                </div>
                
            </div>
            <h3 className={styles.name}>{item.name}</h3>
            <h3 className={styles.gender}>{item.gender === "Men" ? "MNS" : "WMNS"}</h3>
            
            <div className={styles.priceBox}>
            <h3 className={`${styles.price} ${item.onSale === true && styles.linethrough}`}>${item.price.toFixed(2)}</h3>
            {item.onSale === true && <h3 className={styles.discountedPrice}>${
                (item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)
            }</h3>}
            </div>
        </div>
        {showDeletModal === true && <div  className="modalContainer">
            <div ref={refElement} className="modal">
                <h1 className="modalTitle">Remove Item</h1>
                <p className="modalParag">Would you like to remove it from your favorites?</p>
                <div className="modalBtnBox">
                    <button onClick={toggleDeleteModal} className="modalButton modalLeftButton">Cancel</button>
                    <button onClick={()=>{
                        setShowDeleteModal(false);
                        removeFromFavorites(fav.id)
                    }
                        } className="modalButton modalRightButton">Remove</button>
                </div>
            </div>
        </div>}
    </section>
    </>
  )
}
