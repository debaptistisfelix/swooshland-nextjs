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
            Thank you for your order!
            We are thrilled to confirm that your purchase is complete. Your satisfaction is our top priority, and we appreciate your trust in our online store. Below, you will find important information regarding your order. Please keep this information for future reference.
            </p>
            <section className={styles.details}>
                <div className={styles.detailLine}>
                    <h2 className={styles.detailLabel}>Order Nr:</h2>
                    <h2 className={styles.detailInfo}>A84HF64GS01TDH6G</h2>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Order Date:</h2>
                <h2 className={styles.detailInfo}>23-07-2023</h2>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Shipping Address</h2>
                <div className={styles.shippingInfo}>
                    <h2 className={styles.detailInfo}>John Doe</h2>
                    <h2 className={styles.detailInfo}>1234 Main St.</h2>
                    <h2 className={styles.detailInfo}>Anytown, CA 12345</h2>
                    <h2 className={styles.detailInfo}>United States</h2>
                    <h2 className={styles.detailInfo}>+39 1234558907</h2>
                </div>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Products details:</h2>
                <div className={styles.productsInfo}>
                    <div className={styles.itemBox}>
                        <h2 className={styles.detailInfo}>Jordan 1 Mid</h2>
                        <h2 className={styles.detailInfo}>Sin of Lust</h2>
                        <h2 className={styles.detailInfo}>$289.90</h2>
                        <h2 className={styles.detailInfo}>EU 39</h2>
                        <h2 className={styles.detailInfo}>WMNS Sneaker</h2>
                    </div>
                </div>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Subtotal</h2>
                <h2 className={styles.detailInfo}>$579.90</h2>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Shipping</h2>
                <h2 className={styles.detailInfo}>$00.00</h2>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Total</h2>
                <h2 className={styles.detailInfo}>$579.90</h2>
                </div>
            </section>
            <p className={styles.parag}>
            We will begin processing your order immediately. You will receive a confirmation email with tracking information once your order has been shipped. If you have any questions or need further assistance, please don't hesitate to contact our customer support team. We are always here to help.
            </p>
            <p className={styles.parag}>
            Thank you again for choosing our online store. We look forward to serving you again in the future!
            </p>
           
            <p className={styles.parag}>Swooshland Team</p>
          </div>
        </section>
   </main>
  )
}
