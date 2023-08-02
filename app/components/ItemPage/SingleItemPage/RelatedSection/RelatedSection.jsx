import styles from './RelatedSection.module.css'
import { poppins } from '@app/fonts'
import ShopItemCard from '@app/components/ItemCards/ShopItemCard/ShopItemCard'

export default function RelatedSection() {
  return (
    <main className={ `${styles.section} ${poppins.className}`}>
        <h1 className={styles.title}>You may also like</h1>
        <div className={styles.list}>
            <ShopItemCard />
            <ShopItemCard />
            <ShopItemCard />
            <ShopItemCard />
        </div>
    </main>
  )
}
