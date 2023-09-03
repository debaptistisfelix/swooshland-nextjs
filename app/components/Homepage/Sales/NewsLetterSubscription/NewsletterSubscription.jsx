import styles from './NewsletterSubscription.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { poppins } from '@app/fonts';

export default function NewsletterSubscription() {
    <main className={`${styles.section} ${poppins.className}`}>
         <h2 className={styles.letterTitle}>Newsletter</h2>
          <p className={styles.letterParag}>Subscribe to stay updated!</p>
          <form className={styles.form}>
            <input className={styles.input} type="email" placeholder="Email Address" />
            <button type="submit" className={styles.submitBtn}>
              <FontAwesomeIcon icon={faEnvelopeCircleCheck} className={styles.letterIcon} />
            </button>
          </form>
    </main>
}