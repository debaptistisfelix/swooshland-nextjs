import styles from './TextBlock.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import SizeTableContainer from './SizeTable/SizeTableContainer'

export default function TextBlock() {
  return (
    <section className={styles.textBox}>
            <div className={styles.titleBox}>
                <h1 className={styles.title}>Jordan 1 Mid Rogue</h1>
                <h3 className={styles.name}>Sin of Lust</h3>
                <div className={styles.reviewBox}>
                    <div className={styles.starBox}>
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    </div>
                    <p className={styles.reviewCount}>(4.8/5, 689 reviews)</p>
                </div>
            </div>
            <div className={styles.priceBox}>
                <h2 className={styles.price}>$202.93</h2>
                <div className={styles.discountBox}>
                <h2 className={styles.fullPrice}>$289.90</h2>
                <div className={styles.line}></div>
                </div>

            </div>
            <p className={styles.description}>
            A Rock&Roll Vibe, a red color that makes anyone turn their heads when you pass by and white roses to steal their heart!
            </p>

            <SizeTableContainer />  

            <section className={styles.btnBox}>
                <button className={styles.addBtn}>Add to Cart</button>
                <button className={styles.heartBtn}>
                    <FontAwesomeIcon icon={faHeart} className={styles.heart} />
                </button>
            </section>
        </section>
  )
}
