import styles from './Footer.module.css'
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Footer() {
  return (
   <main className={`${styles.footer} ${poppins.className}`}>
        <section className={styles.socials}>
            <div className={styles.motto}>
                <h3 className={styles.title}>Swooshland Customs</h3>
                <p className={styles.mottoParag}>Get your sneakers delivered right to your doorstep!</p>
            </div>
            <div className={styles.socialBox}>
           <Link href="https://www.instagram.com/swooshlandcustoms/" target='_blank' className="Link"> <FontAwesomeIcon icon={faInstagram} className={styles.icon} /></Link>
               
                <Link href="https://www.facebook.com/swooshlandcustoms" className='Link' target="_blank">
                <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
                </Link>
               <Link className='Link' target="_blank" href="https://twitter.com/">
               <FontAwesomeIcon icon={faTwitter} className={styles.icon} /></Link>
            </div>
        </section>
        <section className={styles.contact}>
            <div className={styles.questionBox}>
                <h6 className={styles.question1}>Need assistance?</h6>
                <h3 className={styles.question2}>Our support team is available 24/7 to help you with any queries.</h3>
            </div>
            <div className={styles.contactInfos}>
                <div className={styles.contactInfo}>
                    <FontAwesomeIcon icon={faPhone} className={styles.iconContact} />
                    <p className={styles.contactParag}>+1 234 567 890</p>
                </div>
                <div className={styles.contactInfo}>
                    <FontAwesomeIcon icon={faEnvelope} className={styles.iconContact} />
                    <p className={styles.contactParag}>
                        swooshlandcustoms@outlook.com
                    </p>
                    </div>
            </div>
        </section>
   </main>
  )
}
