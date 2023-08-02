import styles from './page.module.css'
import { poppins } from '@app/fonts'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import MainBannerItem from '@app/components/ItemPage/SingleItemPage/MainBannerItem/MainBannerItem'
import RelatedSection from '@app/components/ItemPage/SingleItemPage/RelatedSection/RelatedSection'
import ReviewSection from '@app/components/ItemPage/SingleItemPage/ReviewsSection/ReviewSection'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'

export default function page() {
  return (
    <main className={`${styles.itemPage} ${poppins.className}`}>
         <BackBtnWithArrow path="/" text="Back to Home" />
            <MainBannerItem />
         
            <RelatedSection />
            <ReviewSection />
    </main>
  )
}
