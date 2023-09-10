import styles from './SaleCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function SaleCard({product}) {
  return (
   <main className={styles.card}>
    <section className={styles.shader}>
        <Link href={product.url} className={`Link ${styles.linkBtn}`}>Shop</Link>
    </section>
    <section className={styles.titleBox}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.parag}>{product.parag}</p>
    </section>
    <section className={styles.imgBox}>
        <Image sizes="100vw" srcset={product.sizes} className={styles.img} src={product.img} alt="sale1" fill={true} loading='lazy'  />
    </section>
    <Link href={product.url} className={`${styles.mobileImgBox} Link`}>
        <Image 	sizes="100vw" className={styles.img} src={product.img} alt="sale1" fill={true} loading='lazy'  />
    </Link>
    <section className={styles.priceBox}>
       <span className={styles.oldPriceBox}>
        <p className={styles.oldPrice}>{product.oldPrice}</p>
        <div className={styles.line}></div>
       </span>
       
       <h3 className={styles.newPrice}>{product.newPrice}</h3>
    </section>
   </main>
  )
}
