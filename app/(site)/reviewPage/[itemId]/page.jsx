
import ReviewPageSection from '@app/components/ReviewPage/ReviewPageSection/ReviewPageSection'
import styles from './page.module.css'

export const metadata = {
  title: 'Review Item - Swooshland Customs',
  description: 'Manage your cart items here. Add, remove, and update your cart items.',
} 

export default function page() {


  return (
    <>
    <ReviewPageSection />
    </>
  )
}
