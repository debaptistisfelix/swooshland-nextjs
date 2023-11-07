
import styles from './page.module.css'
import { poppins } from '@app/fonts'
import CartSection from '@app/components/CartPage/CartSection/CartSection'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'



export const metadata = {
    title: 'Cart - Swooshland Customs',
    description: 'Manage your cart items here. Add, remove, and update your cart items.',
  } 

export default function page() {
  
   
    
  return (
    <main className={`pageContainer ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Home" />
        <section className="pageContent">
        <h1 className={`${styles.cartTitle} bigTitle`}>Your Cart</h1>
        <CartSection />
        </section>
    </main>
  )
}