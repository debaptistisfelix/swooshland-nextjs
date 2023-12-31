"use client"
import styles from './CheckoutSection.module.css'
import CartSummary from '@app/components/CartPage/CartSummary/CartSummary'
import SmallSummary from '@app/components/Checkout/SmallSummary/SmallSummary'
import { useSession } from "next-auth/react"
import UserAddressesContextProvider from '@app/context/UserAddressesContext'
import CheckoutShippingSection from '@app/components/Checkout/CheckoutShippingSection/CheckoutShippingSection'
import CheckoutPaymentMethod from '@app/components/Checkout/CheckoutPaymentMethod/CheckoutPaymentMethod'
import DeletedCartItemsBox from '@app/components/Checkout/DeletedCartItemsBox/DeletedCartItemsBox'
import { useContext, useEffect } from 'react'
import { CartContext } from '@app/context/CartContext'

export default function CheckoutSection() {
    const { data: session, status } = useSession()
    const {deletedCartItemsBeforeCheckout, setItemsAvailabilityWasChecked, setDeletedCartItemsBeforeCheckout} = useContext(CartContext)
  
    useEffect(()=>{
      setItemsAvailabilityWasChecked(false)
      setDeletedCartItemsBeforeCheckout([]);
    },[])
  return (
    <section className={styles.container}>
    <section className={styles.provideInfoSection}>

     <div className={styles.mobileSmallCartRecap}>
     <SmallSummary />
    {deletedCartItemsBeforeCheckout.length > 0 &&  <DeletedCartItemsBox />}
     </div>

     <UserAddressesContextProvider>
      <CheckoutShippingSection />
    


     

      <div className={styles.mobileCartSummary}>
      <CartSummary />
      </div>
     
          <CheckoutPaymentMethod />
      </UserAddressesContextProvider>
      

      </section>
      <section className={styles.recapSection}>
      <div className={styles.desktopSmallCartRecap}>
      <SmallSummary />
      </div>
      {deletedCartItemsBeforeCheckout.length > 0 && <div className={styles.deletedCartItemsContainer}>
      <DeletedCartItemsBox />
      </div>} 
     
      <div className={styles.desktopCartSummary}>
      <CartSummary />
      </div>
      
     
    </section>  
  </section>
  )
}
