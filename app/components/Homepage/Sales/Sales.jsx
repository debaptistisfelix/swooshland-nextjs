import styles from './Sales.module.css';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import SaleCard from './SaleCard/SaleCard';


export default function Sales() {
  const salesProducts = [
    {
      title: 'Jordan 1 Mid',
      parag: 'OG Orange',
      img: '/orange5.jpg',
      oldPrice: '$289.90',
      newPrice: '$202.93',
     
    },
    {
      title: 'Wallet Naruto',
      parag: 'Ramen Money',
      img: '/walletSteso.jpg',
      oldPrice: '$69.90',
      newPrice: '$48.93',
      
    },

  ]
  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <h2 className={styles.title}>On Sale</h2>
        <section className={styles.saleCardBox}>
        
       {salesProducts.map(product =>{
          return  <div className={styles.cardContainer}>
          <SaleCard product={product} />
          </div>
       })}
           
        </section>
        <section className={styles.newsletterBox}>
          <h2 className={styles.letterTitle}>Newsletter</h2>
          <p className={styles.letterParag}>Subscribe to stay updated!</p>
          <form className={styles.form}>
            <input className={styles.input} type="email" placeholder="Email Address" />
            <button type="submit" className={styles.submitBtn}>

              <FontAwesomeIcon icon={faEnvelopeCircleCheck} className={styles.letterIcon} />
            </button>
          </form>
        </section>
    </main>
  )
}
