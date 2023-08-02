import styles from './CartSummary.module.css'

export default function CartSummary() {
  return (
    <main className={styles.section}>
        <h1 className={`${styles.title} smallTitle`}>Order Summary</h1>
        <div className={styles.box}>
            <p className={`${styles.label} mainParag`}>Subtotal</p>
            <p className={`${styles.label} mainParag`}>$579.90</p>
        </div>
        <div className={styles.box}>
            <p className={`${styles.label} mainParag`}>Discount</p>
            <p className={`${styles.label} mainParag`}>$57.90</p>
        </div>
        <div className={styles.box}>
            <p className={`${styles.label} mainParag`}>Discounted Subtotal</p>
            <p className={`${styles.label} mainParag`}>$529.90</p>
        </div>
        <p className={`${styles.discountParag} mainParag`}>Shipping cost are 20$. If Subtotal is over $200 the shipping is FREE.</p>
        <div className={styles.box}>
            <p className={`${styles.label} mainParag`}>Shipping</p>
            <p className={`${styles.label} mainParag`}>$00.00</p>
        </div>
        <div className={styles.totalBox}>
            <p className={`${styles.label} mainParag`}>Total</p>
            <p className={`${styles.label} mainParag`}>$529.90</p>
        </div>
    </main>
  )
}
