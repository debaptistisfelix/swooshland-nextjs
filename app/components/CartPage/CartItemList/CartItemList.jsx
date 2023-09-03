"use client"
import styles from './CartItemList.module.css'
import CartCard from '@app/components/ItemCards/CartCard/CartCard'
import { useContext } from 'react'
import { CartContext } from '@app/context/CartContext'
import { v4 as uuidv4 } from 'uuid';
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'

export default function CartItemList() {
    const {cartItems, deleteCartItemFromCart, isCartLoading} = useContext(CartContext)
  return (
    <main className={styles.cartList}>
        {cartItems.length > 0 && cartItems.map(cartItem =>{
            return  <div key={uuidv4()} className={styles.cardBox}>
            <CartCard cartItem={cartItem} deleteCartItemFromCart={deleteCartItemFromCart} />    
        </div>
        })}
        {cartItems.length === 0 && isCartLoading.fetchingCartItems === false && <p className={styles.noResults}>Your cart is empty.</p> }
        {(isCartLoading.fetchingCartItems === true || isCartLoading.removingCartItem === true) && <ThreeCirclesLoader />}             
    </main>
  )
}
