"use client"

import styles from './CheckoutPaymentMethod.module.css'
import { poppins } from '@app/fonts'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserAddressesContext } from '@app/context/UserAddressesContext'
import { CartContext } from '@app/context/CartContext'
import { OrderContext } from '@app/context/OrderContext'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51MlaBCGchiLw6IuQQ8xDwhwdrG0wDMR34bc2MExpwbAzzOFaR2VmdZLw1TmcXFgivYidIYxVHnl4nBK1crcp3IEW00a73CWL5k");


export default function CheckoutPaymentMethod() {
    const [checked, setChecked] = useState(false)
    const {checkoutAddress,  checkValidationBeforePayment} = useContext(UserAddressesContext);
    const {calculateSubtotal,
      calculateDiscountedSubtotal, cartItems, cartSummary, moveBackToCartIfCartWasEmptied, itemsAvailabilityWasChecked, setItemsAvailabilityWasChecked, isCartLoading} = useContext(CartContext)
    const { createOrder, isLoading, order } = useContext(OrderContext)
 
    const [orderInfos, setOrderInfos] = useState(null);

  useEffect(()=>{
    setItemsAvailabilityWasChecked(false)
  },[])


 useEffect(()=>{
    if(itemsAvailabilityWasChecked === true && cartItems.length > 0 ){
      const cartItemsIdsArray = cartItems.map(cartItem => cartItem.id);
      const stripeCartItemsArray = cartItems.map(cartItem => {
        return cartItem.item.stripe;
      })
      const boughtItems = cartItems.map(cartItem => {
        return {
          item: cartItem.item,
          size: cartItem.availableSize.EUsize
        }
      });
     /*  const shipping =cartSummary.shipping */
     let shipping;
     let total;

      const thereIsDiscountedItem = cartItems.some(cartItem => cartItem.onSale === true);
      const subtotal = thereIsDiscountedItem ? calculateSubtotal() : calculateDiscountedSubtotal();

      if(subtotal < 200){
        shipping = 20;
      } else {
        shipping = 0;
      }
      total = subtotal + shipping;
      console.log("subtotal:", subtotal)
      console.log("total:", total)
      const orderAddress = checkoutAddress;
      const orderData = {
        subtotal,
        shipping,
        total,
        cartItems: cartItemsIdsArray,
        stripeCartItems: stripeCartItemsArray,
        orderAddress,
        boughtItems
      }
      setOrderInfos(orderData)
    }
  }, [itemsAvailabilityWasChecked, cartItems]) 

   
console.log("ordersInfo:",orderInfos)


    const toggleCheckBox = ()=>{
        setChecked(!checked);
        
    }


   useEffect(()=>{
    if(cartItems.length === 0){
      moveBackToCartIfCartWasEmptied()
    }
   },[cartItems])

   const handleCheckoutSessionStripe = async ()=>{
    if(order !== null){
      const stripeItems = orderInfos.stripeCartItems
      try{
        const stripe = await stripePromise;
       /*  const response = await fetch('/api/checkoutSession', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({items: stripeItems})
        }); */
        const response = await fetch(`/api/checkoutSession/${order}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({items: stripeItems})
        });
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (result.error) {
          // Handle any errors that occur during the redirect
          console.error(result.error.message);
        }
      }
      catch(error){
        console.log(error);
      }
    }
   };

   useEffect(()=>{
    handleCheckoutSessionStripe();
   },[
    order
   ])
   
 
  
  return (
    <>
    {checkoutAddress !== null && <>
      <section className={`${styles.paymentMethodBox} ${poppins.className}`}>
    <h1 className={`${styles.paymentTitle} smallTitle`}>Payment Method</h1>
    <p className={`${styles.paymentParag} mainParag`}>
    All  the credit cards transactions on our website are handled through the STRIPE platform.
    </p>
   
    <div className={styles.termsBox}>
    <input onChange={toggleCheckBox}   type="checkbox" className={styles.checkbox} />
    <p className={styles.termsParag}>
    By proceeding with the purchase, I acknowledge that I have read and understood the terms and conditions provided by [Company Name]. I agree to abide by these terms and conditions, including any applicable policies or guidelines mentioned therein. I consent to the collection, storage, and processing of my personal information in accordance with the privacy policy outlined by [Company Name]. I understand that it is my responsibility to review the terms and conditions periodically for any updates or changes. If I have any questions or concerns regarding the terms and conditions, I will reach out to [Company Name] for clarification before completing the purchase.
    </p>
    </div>
    <button onClick={async ()=>{
      if(itemsAvailabilityWasChecked === false) {
        checkValidationBeforePayment(checked);
      } else if(itemsAvailabilityWasChecked === true){
        await createOrder(orderInfos);
        /* handleCheckoutSessionStripe(); */
       
      }
      }}   className={`mainButton ${styles.completeBtn}`}>
        {itemsAvailabilityWasChecked === false ? "Check Availability" : "Complete Order"}
      </button>
      {(isLoading.creatingOrder === true || isCartLoading.removingCartItem === true || isCartLoading.checkingAvailability === true )&& <ThreeCirclesLoader/>}
   </section>
    </>}
    </>
  )
}
