import styles from './SmallSummary.module.css'
import { poppins } from '@app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

export default function SmallSummary() {
  return (
    <main className={`${styles.card} ${poppins.className}`}>
        <div className={styles.titleBox}>
            <h1 className={`${styles.title} smallTitle`}>Your Cart</h1>
           <Link className='Link' href="/cart">
           <FontAwesomeIcon icon={faPencil} className={styles.icon} /></Link>
        </div>
        <section className={styles.content}>
                <div className={styles.itemsBox}>
                    <h3 className={`${styles.itemsCount} mainParag`}>7 items</h3>
                    <div className={styles.itemsList}>
                        <div className={styles.imgBox}>
                            <Image fill={true} className={styles.img} src="/walletSu.jpg" alt="wallet"  />
                        </div>
                        <div className={styles.imgBox}>
                            <Image fill={true} className={styles.img} src="/walletSu.jpg" alt="wallet"  />
                        </div>
                        <div className={styles.imgBox}>
                            <Image fill={true} className={styles.img} src="/walletSu.jpg" alt="wallet"  />
                        </div>
                        <div className={styles.imgBox}>
                            <Image fill={true} className={styles.img} src="/walletSu.jpg" alt="wallet"  />
                        </div>
                        <div className={styles.imgBox}>
                            <Image fill={true} className={styles.img} src="/walletSu.jpg" alt="wallet"  />
                        </div>
                        <div className={styles.imgBox}>
                            <Image fill={true} className={styles.img} src="/walletSu.jpg" alt="wallet"  />
                        </div>
                       
                    </div>
                </div>
                <div className={styles.subtotalBox}>
                    <h3 className={`${styles.subtotalLabel} mainParag`}>Subtotal</h3>
                    <h1 className={`${styles.subtotal} smallTitle`}>$1469.90</h1>
                </div>
            </section>
    </main>
  )
}
