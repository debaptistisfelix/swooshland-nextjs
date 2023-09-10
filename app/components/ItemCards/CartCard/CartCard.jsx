"use client"
import styles from './CartCard.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { poppins } from '@app/fonts'
import ImageLoader from '@app/components/Reusables/ImageLoader/ImageLoader'

export default function CartCard({cartItem, deleteCartItemFromCart}) {
    const [isDeleting, setIsDeleting] = useState(false)
    const refElement = useRef(null)
    const {item, availableSize} = cartItem;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(refElement.current && !refElement.current.contains(e.target)){
                setIsDeleting(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const toggleDeleteStatus =() => {
        setIsDeleting(!isDeleting)
    }

    useEffect(() => {
        if(isDeleting === true) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isDeleting])


  return (
   <main className={`${styles.card} ${poppins.className} `}>
    <section className={styles.imgBox}>
        <ImageLoader />
        <Image
         onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
        className={styles.img} src={`/${item?.images[0]}`} alt="shoe" fill={true} />
        {item.onSale === true &&  <h3 className={styles.discountTag}>-{item.discountPercentage}%</h3>}
    </section>
   
    <section className={styles.textBox}>
        <h1 className={styles.title}>{item.model}</h1>
        <h3 className={styles.name}>{item.name}</h3>
        <h3 className={styles.gender}>{item.gender === "Men" ? "MNS" : "WMNS"}</h3>
        <div className={styles.priceBox}>
          
            {item.onSale === true && <h3 className={styles.discountedPrice}>${
                (item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)
            }</h3>}
              <h3 className={`${styles.price} ${item.onSale === true && styles.linethrough}`}>${item.price.toFixed(2)}</h3>
            </div>
        <div className={styles.sizeBox}>
            <h3 className={styles.sizeLabel}>Size</h3>
            <h3 className={styles.actualSize}>EU {availableSize?.EUsize === 0 ? "OS" : availableSize?.EUsize}</h3>
        </div>
    </section>
    <section className={styles.xBox}>
        <FontAwesomeIcon onClick={toggleDeleteStatus} icon={faX} className={styles.icon} />
    </section>
 

    {isDeleting  === true && <section className="modalContainer">
      <div ref={refElement} className="modal">
      <h1 className="modalTitle">Remove Item</h1>
        <p className="modalParag">Would you like to remove this item from your cart?</p>
        <div className="modalBtnBox">
            <button onClick={toggleDeleteStatus} className="modalButton modalLeftButton">
                Cancel
            </button>
            <button onClick={()=>{
                deleteCartItemFromCart(cartItem)
                toggleDeleteStatus()
            }} className="modalButton modalRightButton">
                Remove
            </button>
        </div>
      </div>
        </section>}

   </main>
  )
}
