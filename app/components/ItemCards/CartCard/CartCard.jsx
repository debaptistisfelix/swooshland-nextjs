"use client"
import styles from './CartCard.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { poppins } from '@app/fonts'

export default function CartCard() {
    const [isDeleting, setIsDeleting] = useState(false)
    const refElement = useRef(null)

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
        <Image className={styles.img} src="/lust1.jpg" alt="shoe" fill={true} />
    </section>
   
    <section className={styles.textBox}>
        <h1 className={styles.title}>Jordan 1 Mid Rogue</h1>
        <h3 className={styles.name}>Sin of Lust</h3>
        <h1 className={styles.price}>$289.90</h1>
        <div className={styles.sizeBox}>
            <h3 className={styles.sizeLabel}>Size</h3>
            <h3 className={styles.actualSize}>EU 39</h3>
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
            <button className="modalButton modalRightButton">
                Remove
            </button>
        </div>
      </div>
        </section>}

   </main>
  )
}
