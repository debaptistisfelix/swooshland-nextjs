import Link from 'next/link'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'

export default function AccessoriesPage() {
  return (
    <main className={`${styles.accessoriesPage} ${poppins.className}`}>
       <BackBtnWithArrow path="/" text="Back to Home" />
        <div className={styles.banner}>
          
            <Image alt="nikeaf1" fill="true" className={styles.image} src="/walletSu.jpg" />
            <div className={styles.shader}>
                <div className={styles.text}>
                    <h1 className={styles.title}>Complete your Unique Style</h1>
                </div>
            </div>
        </div>
    </main>
  )
}
