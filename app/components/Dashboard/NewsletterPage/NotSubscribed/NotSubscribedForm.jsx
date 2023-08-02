import styles from './NotSubscribedForm.module.css'
import { poppins } from '@app/fonts'

export default function NotSubscribedForm() {
  return (
    <main className={`${poppins.className} ${styles.unsubscribedUser}`}>
        <p className={styles.parag}>Your Email Address is not registered in our Newsletter List.</p>
        <form className={styles.form}>
            <input className={`input ${styles.emailInput}`} type="email" placeholder="Enter your email address" />
            <div className={styles.privacyBox}>
            <input className={styles.checkboxInput} type="checkbox"  />
            <p className={styles.privacyText}>Yes, I would like to subscribe to the SWOOSHLAND newsletter and receive updates on promotions and news. By subscribing, I agree to SWOOSHLAND data protection information and give my consent for the collection, storage, and processing of the described data. Unsubscribing is possible at any time through the link in the email and via our customer service.<span className={styles.privacyLink}>Privacy Policy</span></p>
            </div>
            <button className={`mainButton ${styles.button}`}>Subscribe to Newsletter</button>
        </form>
    </main>
  )
}
