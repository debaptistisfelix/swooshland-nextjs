import styles from './page.module.css'
import { poppins } from '@app/fonts'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'

export default function page() {
  return (
    <main className={`pageContainer  ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Shop" />
        <section  className="pageContent">
          <div className={styles.card}>
            <h1 className={styles.title}>There was an ERROR with your Order!</h1>
            <p className={styles.parag}>
            We apologize for the inconvinience!
            </p>
            <p className={styles.parag}>
            We regret to inform you that there was an error processing your order. We understand that this may be disappointing, and we sincerely apologize for any inconvenience caused. Our team is actively working to resolve the issue, and we appreciate your patience..
            </p>
            <p className={styles.parag}>
            If you have been charged for the order, rest assured that we will promptly initiate a refund. You should see the refunded amount reflected in your account within 24/48 hours.
            </p>
            <p className={styles.parag}>
            Once again, we sincerely apologize for any inconvenience caused. We value your business and appreciate your understanding. Our team is committed to ensuring a seamless shopping experience, and we will make every effort to rectify this situation promptly.
            </p>
            <p className={styles.parag}>Thank you again for your understanding and patiance.</p>
            <p className={styles.parag}>Swooshland Team</p>
          </div>
        </section>
    </main>
  )
}
