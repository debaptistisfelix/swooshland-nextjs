"use client"

import styles from './CheckoutAddressForm.module.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/react"
import { UserAddressesContext } from '@app/context/UserAddressesContext'
import { useContext } from 'react'

export default function CheckoutAddressForm() {
    const { data: session, status } = useSession()
    const { addresses, checkoutFormData, handleCheckoutInputChange, showCheckoutAddressForm,  toggleshowCheckoutAddressForm, checkoutAddress, selectCheckOutAddressFromCheckoutForm} = useContext(UserAddressesContext)
    
 
    useEffect(() => {
        if(status !== "authenticated"){
            toggleshowCheckoutAddressForm(true)
        } else if(status === "authenticated" && addresses.length === 0){
            toggleshowCheckoutAddressForm(true)
        } else if(status === "authenticated" && addresses.length > 0){
            toggleshowCheckoutAddressForm(false)
        }
    }, [status])


  return (
    <main className={styles.provideShippingInfo}>
                 <div className={styles.labelTitleBox}>
                 <p className={`${styles.paymentParag} mainParag`}>
                    {addresses.length > 0 ? `Or provide a new shipping Address ${showCheckoutAddressForm === false && "by clicking here"}:` : "Provide a shipping Address:"}
                  </p>
                  <FontAwesomeIcon onClick={toggleshowCheckoutAddressForm} className={styles.downIcon} icon={showCheckoutAddressForm === false ? faChevronDown : faChevronUp} />
                 </div>


                 {showCheckoutAddressForm === true &&  <div className={styles.inputsContainer}>
                    <input value={checkoutFormData.name} onChange={handleCheckoutInputChange} name="name" className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='Name' />
                    <input value={checkoutFormData.surname} onChange={handleCheckoutInputChange} name="surname" className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='Surname' />
                    <input value={checkoutFormData.phone} onChange={handleCheckoutInputChange} name="phone" className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='Phone Number' />
                    <input  onChange={handleCheckoutInputChange} name="email" value={checkoutFormData.email} className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='Email Address' />
                    <input value={checkoutFormData.street} onChange={handleCheckoutInputChange} name="street" className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='Address' />
                    <input value={checkoutFormData.zip} onChange={handleCheckoutInputChange} name="zip" className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='Post Code' />
                    <input value={checkoutFormData.city} onChange={handleCheckoutInputChange} name="city" className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='City' />
                    <input value={checkoutFormData.state} onChange={handleCheckoutInputChange} name="state" className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='State/Region' />
                    <input value={checkoutFormData.country} onChange={handleCheckoutInputChange} name="country" className={`input ${styles.input} ${checkoutAddress === checkoutFormData && styles.confirmed}`} type="text" placeholder='Country' />
                    <button onClick={()=>{selectCheckOutAddressFromCheckoutForm(checkoutFormData)}} className={styles.confirmAddressBtn}>Confirm</button>
                  </div>} 
     </main>
  )
}
