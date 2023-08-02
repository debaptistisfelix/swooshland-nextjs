"use client"

import styles from './NoSizeCard.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'

export default function NoSizeCArd() {
    const [showDeletModal, setShowDeleteModal] = useState(false)
    const refElement = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(refElement.current && !refElement.current.contains(e.target)){
                setShowDeleteModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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


  return (
    <main className={styles.card}>
        <div className={styles.imageBox}>
            <Image className={styles.image} src="/lust1.jpg" alt="jordan-1-rogue" fill={true}  />
            <div className={styles.shade}>
                <div className={`${styles.button} ${styles.shopBtn}`}>
                   <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
                </div>
                <div onClick={toggleDeleteModal} className={`${styles.button} ${styles.deleteBtn}`}>
                    <FontAwesomeIcon  className={styles.icon} icon={faTrash} />
                </div>
            </div>
        </div>
        <div className={styles.textBox}>
            <h2 className={styles.item}>Jordan 1 Mid</h2>
            <h2 className={styles.price}>$289.90</h2>
            <h3 className={styles.name}>Sin of Lust</h3>
            <div className={styles.starsBox}>
                <FontAwesomeIcon className={styles.star} icon={faStar} />
                <FontAwesomeIcon className={styles.star} icon={faStar} />
                <FontAwesomeIcon className={styles.star} icon={faStar} />
                <FontAwesomeIcon className={styles.star} icon={faStar} />
                <FontAwesomeIcon className={styles.star} icon={faStar} />
            </div>
        </div>
        {showDeletModal === true && <div className="modalContainer">
            <div ref={refElement} className="modal">
                <h1 className="modalTitle">Remove Item</h1>
                <p className="modalParag">Would you like to remove it from your favorites?</p>
                <div className="modalBtnBox">
                    <button onClick={toggleDeleteModal} className="modalButton modalLeftButton">Cancel</button>
                    <button className="modalButton modalRightButton">Remove</button>
                </div>
            </div>
        </div>}
    </main>
  )
}
