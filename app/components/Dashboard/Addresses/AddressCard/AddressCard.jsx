"use client"

import styles from './AddressCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faPencil, faPenToSquare, faPen } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import EditAddressForm from '../EditAddressForm/EditAddressFrom'
import { useContext } from 'react'
import { UserAddressesContext } from '@app/context/UserAddressesContext'

export default function AddressCard({address}) {
    const {
        fetchRemoveAddress,
        updateDefaultAddress
      } = useContext(UserAddressesContext)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDefaultAddressModal, setShowDefaultAddressModal] = useState(false)
    const refElement = useRef(null)
    const {name, surname, phone, street, zip, city, state, country} = address;

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
        if(showDeleteModal === true || showDefaultAddressModal === true){
        document.body.style.overflow = "hidden"
        }else {
          document.body.style.overflow = "unset"
        }
    }, [showDeleteModal])

    console.log(showDefaultAddressModal)

  return (
    <main className={styles.card}>
        {showDefaultAddressModal === true && <section className='modalContainer'>
            <div className="modal">
                <h3 className="modalTitle">Defaul Address</h3>
                <p className="modalParag">Are you sure you want to set this address as default?</p>
                <div className="modalBtnBox">
                    <button onClick={()=>{setShowDefaultAddressModal(false)}} className={`modalButton modalLeftButton ${styles.leftDefaultBtn}`}>Cancel</button>
                    <button onClick={()=>{
                        updateDefaultAddress(address)
                        setShowDefaultAddressModal(false)
                    }} className={`modalButton modalRightButton ${styles.rightDefaultBtn}`}>Yes</button>
                </div>    
            </div>
            </section>}
       { showEditModal === false && <>
       <label className={styles.container}>
       <input onClick={()=>{
            if(address.default === false){
                setShowDefaultAddressModal(true)
            }
       }} checked={address.default === true && true} className={styles.input} type="radio" name="address" id="address" />
       <span className={styles.checkmark}></span>
       </label>
        <div  className={styles.text}>
        {address.default === true &&  <h3 className={styles.defaultTagMobile}>Default Address</h3>}
            <h3 className={styles.info}>{name} {surname}</h3>
            <h3 className={styles.info}>{phone}</h3>
            <h3 className={styles.info}>{street}</h3>
            <h3 className={styles.info}>{zip}, {city}</h3>
            <h3 className={styles.info}>{state}</h3>
            <h3 className={styles.info}>{country}</h3>
            <div className={styles.mobileIconBox}>
                <FontAwesomeIcon onClick={toggleEditModal} className={styles.icon} icon={faPencil} />
                <FontAwesomeIcon onClick={toggleDeleteModal} className={styles.icon} icon={faX} />
            </div>
        </div>
        {address.default === true && <div className={styles.defaultBox}>
        <h3 className={styles.defaultTag}>Default Address</h3>
        <p className={styles.defaultParag}>click on the radio buttons on the left of each address to set it as your default Shipping address.</p>
            </div>}
           
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
                <button onClick={()=>{
                    fetchRemoveAddress(address)
                    toggleDeleteModal()
                }} className="modalButton modalRightButton">Delete</button>
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
                <EditAddressForm  toggleEditModal={toggleEditModal} address={address} />
                <div className={styles.lineBox}>
           
        </div>
            </div>}
    </main>
  )
}
