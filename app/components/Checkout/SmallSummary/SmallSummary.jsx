"use client"

import styles from './SmallSummary.module.css'
import { poppins } from '@app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { CartContext } from '@app/context/CartContext'
import { v4 as uuidv4 } from 'uuid';

export default function SmallSummary() {
    const {calculateCartSummary, cartSummary, cartItems, appliedDiscount} = useContext(CartContext)

    useEffect(()=>{
        calculateCartSummary()
    }, [cartItems])

    const {subtotal,  discountedSubtotal, shipping, total} = cartSummary;
  return (
    <main className={`${styles.card} ${poppins.className}`}>
        <div className={styles.titleBox}>
            <h1 className={`${styles.title} smallTitle`}>Your Cart</h1>
           <Link className='Link' href="/cart">
           <FontAwesomeIcon icon={faPencil} className={styles.icon} /></Link>
        </div>
        <section className={styles.content}>
                <div className={styles.itemsBox}>
                    <h3 className={`${styles.itemsCount} mainParag`}>{cartItems?.length} items</h3>
                    <div className={styles.itemsList}>
                        {cartItems.length > 0 && cartItems.map((cartItem) =>{
                            return <div key={uuidv4()} className={styles.imgBox}>
                            <Image fill={true} className={styles.img} src={`/${cartItem.item.images[0]}`} alt="wallet"  />
                        </div>
                        })}
                    </div>
                </div>
                <div className={styles.subtotalBox}>
                    <h3 className={`${styles.subtotalLabel} mainParag`}>Subtotal</h3>
                    <h1 className={`${styles.subtotal} smallTitle`}>${appliedDiscount === true ? discountedSubtotal.toFixed(2): subtotal.toFixed(2)}</h1>
                </div>
            </section>
    </main>
  )
}
