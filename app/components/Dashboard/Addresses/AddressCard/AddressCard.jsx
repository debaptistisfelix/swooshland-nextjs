"use client"

import styles from './AddressCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faPencil, faPenToSquare, faPen } from '@fortawesome/free-solid-svg-icons'
import HorizontalDivider from '@app/components/Reusables/HorizontalDivider/HorizontalDivider'
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import EditAddressForm from '../EditAddressForm/EditAddressFrom'

export default function AddressCard() {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
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


    const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
        }

    const toggleEditModal = () => {
    setShowEditModal(!showEditModal)
    };

useEffect(() => {
    if(showDeleteModal === true){
        document.body.style.overflow = "hidden"
    }else {
        document.body.style.overflow = "unset"
    }
}, [showDeleteModal])

  return (
    <main className={styles.card}>
       { showEditModal === false && <>
       <label className={styles.container}>
       <input className={styles.input} type="radio" name="address" id="address" />
       <span className={styles.checkmark}></span>
       </label>
        <div  className={styles.text}>
            <h3 className={styles.info}>Felix De Baptistis</h3>
            <h3 className={styles.info}>3317793796</h3>
            <h3 className={styles.info}>Vicolo Bianco 13</h3>
            <h3 className={styles.info}>40139, Bologna</h3>
            <h3 className={styles.info}>Emilia Romagna</h3>
            <h3 className={styles.info}>Italy</h3>
            <div className={styles.mobileIconBox}>
                <FontAwesomeIcon onClick={toggleEditModal} className={styles.icon} icon={faPencil} />
                <FontAwesomeIcon onClick={toggleDeleteModal} className={styles.icon} icon={faX} />
            </div>
        </div>
        <div className={styles.buttonBox}>
            <button onClick={toggleEditModal} className={styles.button}>Edit</button>
            <button onClick={toggleDeleteModal} className={styles.button}>Remove</button>
        </div>
       
       </>}
       { showDeleteModal === true && showEditModal === false && <div className="modalContainer">
       <div ref={refElement} className="modal">
       <h3 className="modalTitle">Remove Address</h3>
              <h3 className="modalParag">Are you sure you want to delete this address?</h3>
              <div className="modalBtnBox">
                <button onClick={toggleDeleteModal} className="modalButton modalLeftButton">Cancel</button>
                <button className="modalButton modalRightButton">Delete</button>
              </div>
              <div className={styles.lineBox}>
           
        </div>
       </div>
       </div>

       }
       {showDeleteModal === false && showEditModal === true &&
        <div className={styles.editModal}>
            <h3 className={styles.editModalTitle}>
                <FontAwesomeIcon  className={styles.editIcon} icon={faPenToSquare} />
                Edit Shipping Address</h3>
                <EditAddressForm  toggleEditModal={toggleEditModal} />
                <div className={styles.lineBox}>
           
        </div>
            </div>}
    </main>
  )
}
