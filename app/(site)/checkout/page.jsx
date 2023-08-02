"use client"
import styles from './page.module.css'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import { poppins } from '@app/fonts'
import CartSummary from '@app/components/CartPage/CartSummary/CartSummary'
import SmallSummary from '@app/components/Checkout/SmallSummary/SmallSummary'
import { useSession } from "next-auth/react"
import Link from 'next/link'

export default function page() {
  const { data: session, status } = useSession()
  return (
    <main className={`pageContainer ${poppins.className}`}>
        <BackBtnWithArrow path="/cart" text="Back to Cart" />
        <section className={`pageContent`}>
            <h1 className={`${styles.title} bigTitle`}>Checkout</h1>
            <section className={styles.container}>
              <section className={styles.provideInfoSection}>

               <div className={styles.mobileSmallCartRecap}>
               <SmallSummary />
               </div>

               


                <section className={styles.shippingSection}>
                  <h1 className={`${styles.shippingTitle} smallTitle`}>Shipping Address</h1>
                  {status === "authenticated" ?  <div className={styles.authenticatedBox}>
                  <p className={`${styles.paymentParag} mainParag`}>Choose an address from your saved shipping addresses</p>
                  </div> : <div className={styles.notAuthenticatedBox}>
                    <p className={styles.paymentParag}><Link className='Link loginLink' href="/login">Login</Link> to use one of your saved shipping Addresses.</p>
                  </div>}
                  <div className={styles.provideShippingInfo}>
                  <p className={`${styles.paymentParag} mainParag`}>Or provide a new shipping Address here:</p>
                  <div className={styles.inputsContainer}>
                    <input className={`input ${styles.input}`} type="text" placeholder='Name' />
                    <input className={`input ${styles.input}`} type="text" placeholder='Surname' />
                    <input className={`input ${styles.input}`} type="text" placeholder='Phone Number' />
                    <input value={status === "authenticated" ? session.user.email : ""} className={`input ${styles.input}`} type="text" placeholder='Email Address' />
                    <input className={`input ${styles.input}`} type="text" placeholder='Address' />
                    <input className={`input ${styles.input}`} type="text" placeholder='Post Code' />
                    <input className={`input ${styles.input}`} type="text" placeholder='City' />
                    <input className={`input ${styles.input}`} type="text" placeholder='State/Region' />
                    <input className={`input ${styles.input}`} type="text" placeholder='Country' />
                  </div>
                  </div>
                 
                </section>

                <div className={styles.mobileCartSummary}>
                <CartSummary />
                </div>

               <section className={styles.paymentMethodBox}>
                <h1 className={`${styles.paymentTitle} smallTitle`}>Payment Method</h1>
                <p className={`${styles.paymentParag} mainParag`}>
                All  the credit cards transactions on our website are handled through the STRIPE platform.
                </p>
                <div className={styles.termsBox}>
                <input type="checkbox" className={styles.checkbox} />
                <p className={styles.termsParag}>
                By proceeding with the purchase, I acknowledge that I have read and understood the terms and conditions provided by [Company Name]. I agree to abide by these terms and conditions, including any applicable policies or guidelines mentioned therein. I consent to the collection, storage, and processing of my personal information in accordance with the privacy policy outlined by [Company Name]. I understand that it is my responsibility to review the terms and conditions periodically for any updates or changes. If I have any questions or concerns regarding the terms and conditions, I will reach out to [Company Name] for clarification before completing the purchase.
                </p>
                </div>
                <button type="submit" className={`mainButton ${styles.completeBtn}`}>Place Order</button>
               </section>

                </section>
                <section className={styles.recapSection}>
                <div className={styles.desktopSmallCartRecap}>
                <SmallSummary />
                </div>
                <div className={styles.desktopCartSummary}>
                <CartSummary />
                </div>
                
               
              </section>  
            </section>
        </section>
    </main>
  )
}
