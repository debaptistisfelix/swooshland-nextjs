
import styles from './page.module.css'
import { poppins } from '@app/fonts'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import OrderCompleted from '@app/components/OrderCompleted/OrderCompleted'

export const metadata = {
  title: 'Order Confirmation - Swooshland Customs',
  description: 'Manage your cart items here. Add, remove, and update your cart items.',
} 
export default function page() {
  

  return (
    <main className={`pageContainer  ${poppins.className}`}>
         <BackBtnWithArrow path="/" text="Back to Shop" />
        <OrderCompleted />
   </main>
  )
}
