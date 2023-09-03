"use client"

import styles from './CheckoutShippingSection.module.css'
import { poppins } from '@app/fonts'
import CartSummary from '@app/components/CartPage/CartSummary/CartSummary'
import SmallSummary from '@app/components/Checkout/SmallSummary/SmallSummary'
import { useSession } from "next-auth/react"
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react'
import { UserAddressesContext } from '@app/context/UserAddressesContext';
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import AddressCardCheckOut from '../AddressCard/AddressCardCheckOut'
import CheckoutAddressForm from '../CheckoutAddressForm/CheckoutAddressForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function CheckoutShippingSection() {
    const { data: session, status } = useSession()
    const { addresses, fetchAddresses, isLoading, setIsLoading,  openAddressOptionBox,
      toggleOpenAddressOptionBox,  } = useContext(UserAddressesContext);

   

    
    useEffect(()=>{
        if(status === "authenticated"){
            fetchAddresses()
          
        } else if(status !== "authenticated"){
            setIsLoading({...isLoading, checkingIfLoggedIn:false})
        }
    }, [status])


  return (
    <main className={`${styles.shippingSection} ${poppins.className}`}>
      
       <h1 className={`${styles.shippingTitle} smallTitle`}>Shipping Address</h1>
  
              
        {isLoading.fetchingAddresses === true || isLoading.checkingIfLoggedIn === true ? <ThreeCirclesLoader /> : <>
        {status === "authenticated" ?  <div className={styles.authenticatedBox}>
                  {addresses.length > 0 && <><div className={styles.labelTitleBox}><p className={`${styles.paymentParag} mainParag`}>Choose an address from your saved shipping addresses</p>
                  <FontAwesomeIcon onClick={toggleOpenAddressOptionBox} className={styles.downIcon} icon={openAddressOptionBox === true ? faChevronUp : faChevronDown} />
                  </div>
                  {openAddressOptionBox === true && <div className={styles.addressesContainer}>
                    {addresses.length > 0 && addresses.map((address, id)=>{
                        return <AddressCardCheckOut key={id} address={address} />
                    })}
                  </div>}

                  </>}
                  </div> : <div className={styles.notAuthenticatedBox}>
                    <p className={`${styles.paymentParag} mainParag`}><Link className='Link loginLink' href="/login">Login</Link> to use one of your saved shipping Addresses.</p>
                  </div>}

                  <CheckoutAddressForm />
        </>}
             
    </main>
  )
}
