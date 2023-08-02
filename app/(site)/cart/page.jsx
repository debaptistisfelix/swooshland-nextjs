import styles from './page.module.css'
import { poppins } from '@app/fonts'

import CartCard from '@app/components/ItemCards/CartCard/CartCard'
import CartSummary from '@app/components/CartPage/CartSummary/CartSummary'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'

export default function page() {
  return (
    <main className={`pageContainer ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Home" />
        <section className="pageContent">
        <h1 className={`${styles.cartTitle} bigTitle`}>Your Cart</h1>
            <section className={styles.sectionsContainer}>
            <section className={styles.cartItemsBox}>
                
                <div className={styles.cartList}>
                    <div className={styles.cardBox}>
                        <CartCard />    
                    </div>
                    <div className={styles.cardBox}>
                        <CartCard />    
                    </div>
                    <div className={styles.cardBox}>
                        <CartCard />    
                    </div>
                    <div className={styles.cardBox}>
                        <CartCard />    
                    </div>
                    <div className={styles.cardBox}>
                        <CartCard />    
                    </div>
                    <div className={styles.cardBox}>
                        <CartCard />    
                    </div>
                </div>
            </section>
            <section className={styles.summary}>
                <CartSummary />
                <button className={`mainButton ${styles.checkoutBtn}` }>Go to Checkout</button>
            </section>
            </section>
        </section>
    </main>
  )
}