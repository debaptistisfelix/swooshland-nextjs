"use client"

import styles from './CartSection.module.css'
import CartSummary from '@app/components/CartPage/CartSummary/CartSummary'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import CartItemList from '@app/components/CartPage/CartItemList/CartItemList'
import { useContext, useEffect } from 'react'
import { CartContext } from '@app/context/CartContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

export default function CartSection() {
    const {cartItems, fetchCartItems, fetchGuestCartItems} = useContext(CartContext)
    const { data: session, status} = useSession();
    const router = useRouter()

    const handleCheckoutClick = () =>{
        if(cartItems.length === 0){
            toast.error('Your cart is empty. Please add items to your cart before checking out.', {
                style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
            })
        } else {
            router.push('/checkout')
        }
    }
  return (
    <section className={styles.sectionsContainer}>
               
                <section className={styles.cartItemsBox}>
                    <CartItemList />
                    
                </section>
                <section className={styles.summary}>
                    <CartSummary />
                    <button onClick={handleCheckoutClick}  className={`mainButton ${styles.checkoutBtn}` }>
                      Go to Checkout
                    </button>
                </section>
              
               
            </section>
  )
}
