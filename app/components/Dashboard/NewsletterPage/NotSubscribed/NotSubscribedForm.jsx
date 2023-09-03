import styles from './NotSubscribedForm.module.css'
import { poppins } from '@app/fonts'
import { useRef } from 'react'
import { toast } from 'react-hot-toast';

export default function NotSubscribedForm({updateSubscriptionToNewsLetter}) {
  const checkBoxRef = useRef(null);
  return (
    <main className={`${poppins.className} ${styles.unsubscribedUser}`}>
        <p className={styles.parag}>Your Email Address is not registered in our Newsletter List.</p>
        <section className={styles.form}>
           {/*  <input className={`input ${styles.emailInput}`} type="email" placeholder="Enter your email address" /> */}
            <div className={styles.privacyBox}>
            <input ref={checkBoxRef} className={styles.checkboxInput} type="checkbox"  />
            <p className={styles.privacyText}>Yes, I would like to subscribe to the SWOOSHLAND newsletter and receive updates on promotions and news. By subscribing, I agree to SWOOSHLAND data protection information and give my consent for the collection, storage, and processing of the described data. Unsubscribing is possible at any time through the link in the email and via our customer service.<span className={styles.privacyLink}>Privacy Policy</span></p>
            </div>
            <button onClick={()=>{
              if(checkBoxRef.current.checked){
                updateSubscriptionToNewsLetter()
              } else {
                toast.error("You must agree to our Privacy Policy first", {
                  style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
                })
              }
            }} className={`mainButton ${styles.button}`}>Subscribe to Newsletter</button>
        </section>
    </main>
  )
}
