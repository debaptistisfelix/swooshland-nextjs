"use client"

import styles from './CartSummary.module.css'
import { useContext, useEffect } from 'react'
import { CartContext } from '@app/context/CartContext'

export default function CartSummary() {
    const {calculateCartSummary, cartSummary, cartItems, appliedDiscount} = useContext(CartContext)

    useEffect(()=>{
        calculateCartSummary()
    }, [cartItems])

    const {subtotal,  discountedSubtotal, shipping, total} = cartSummary;


  return (
    <main className={styles.section}>
        <h1 className={`${styles.title} smallTitle`}>Order Summary</h1>
        <div className={styles.box}>
            <p className={`${styles.label} mainParag`}>Subtotal</p>
            <p className={`${styles.label} mainParag`}>${subtotal.toFixed(2)}</p>
        </div>
       {appliedDiscount === true  && <> <div className={styles.box}>
            <p className={`${styles.label} mainParag`}>Discount</p>
            <p className={`${styles.label} mainParag`}>${(subtotal - discountedSubtotal).toFixed(2)}</p>
        </div>
        <div className={styles.box}>
            <p className={`${styles.label} mainParag`}>Discounted Subtotal</p>
            <p className={`${styles.label} mainParag`}>${discountedSubtotal.toFixed(2)}</p>
        </div></>}
        <p className={`${styles.discountParag} mainParag`}>Shipping cost are 20$. If Subtotal is over $200 the shipping is FREE.</p>
        <div className={styles.box}>
            <p className={`${styles.label} mainParag`}>Shipping</p>
            <p className={`${styles.label} mainParag`}>${shipping}</p>
        </div>
        <div className={styles.totalBox}>
            <p className={`${styles.label} mainParag`}>Total</p>
            <p className={`${styles.label} mainParag`}>${subtotal !== 0 ? total.toFixed(2) : (0).toFixed(2)}</p>
        </div>
    </main>
  )
}
