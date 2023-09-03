import { poppins } from "@app/fonts"
import styles from "./SubscribedForm.module.css"

export default function SubscribedForm({updateSubscriptionToNewsLetter}) {
    return (
        <main className={`${poppins.className} ${styles.unsubscribedUser}`}>
            <p className={styles.parag}>Your Email Address is registered in our Newsletter List.</p>
            <section className={styles.form}>
               
                <p className={`${styles.parag} ${styles.paragTwo}`}>If you want to cancel your subscription, just click the button below.</p>
           
                <button onClick={updateSubscriptionToNewsLetter} className={`mainButton ${styles.button}`}>Cancel Subscribtion</button>
            </section>
        </main>
    )
}
