import styles from './page.module.css'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import { poppins } from '@app/fonts'
import CheckoutSection from '@app/components/Checkout/CheckoutSection/CheckoutSection'

export const metadata = {
  title: 'Checkout - Swooshland Customs',
  description: 'Checkout your cart items here. Add your Shipping info and pay for your custom sneakers & accessories.',
} 
export default function page() {
  return (
    <main className={`pageContainer ${poppins.className}`}>
        <BackBtnWithArrow path="/cart" text="Back to Cart" />
      
        <section className={`pageContent`}>
            <h1 className={`${styles.title} bigTitle`}>Checkout</h1>
            <CheckoutSection />
        </section>
      
    </main>
  )
}
