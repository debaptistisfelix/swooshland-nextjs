import styles from './TrendingItems.module.css';
import { poppins } from '@app/fonts';
import ShopItemCard from '@app/components/ItemCards/ShopItemCard/ShopItemCard';

export default function TrendingItems() {
  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <h2 className={styles.title}>Trending Products</h2>
        <section className={styles.list}>
            <ShopItemCard />
            <ShopItemCard />
            <ShopItemCard />
            <ShopItemCard />
            <ShopItemCard />
            <ShopItemCard />
         
        </section>
    </main>
  )
}
