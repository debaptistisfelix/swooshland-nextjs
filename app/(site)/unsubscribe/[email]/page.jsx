

import styles from './page.module.css'
import { poppins } from '@app/fonts'
import UnsubscribeSection from '@app/components/Unsubscribe/UnsubscribeSection/UnsubscribeSection'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'

export const metadata = {
    title: 'Unsubscribe Newsletter - Swooshland Customs',
    description: 'Manage your cart items here. Add, remove, and update your cart items.',
  } 

export default function page() {    
  return (
    <main className={`pageContainer ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Shop" />
       <UnsubscribeSection />
    </main>
  )
}
