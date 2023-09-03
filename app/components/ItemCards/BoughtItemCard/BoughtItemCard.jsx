import styles from './BoughtItemCard.module.css'
import Image from 'next/image'

export default function BoughtItemCard({boughtItem}) {
  const {item, size } = boughtItem;
  const {model, name, price, discountPercentage, images} = item;
  let discountedPrice;
  if(discountPercentage > 0){
    discountedPrice = price - (price * (discountPercentage / 100));
  }
  return (
    <main className={styles.card}>
        <div className={styles.imgBox}>
            <Image src={`/${images[0]}`} alt="sneaker-photo" fill={true} />
        </div>
        <div className={styles.textBox}>
            <h4 className={styles.product}>{model}</h4>
            <h6 className={styles.name}>{name}</h6>
            <div className={styles.priceBox}>
           {discountPercentage > 0 &&  <h5 className={styles.discountedPrice}>$ {discountedPrice}</h5>}
            <h5 className={`${styles.price} ${discountPercentage > 0 && styles.lineThrough}`}>$ 289.90</h5>
            </div>
            <h6 className={styles.size}>Size: <b className={styles.bolder}>EU {size}</b></h6>
        </div>
    </main>
  )
}
