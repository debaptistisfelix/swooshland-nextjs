import styles from './ReviewOverview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function ReviewOverview() {
  return (
    <main className={styles.section}>
        <section className={styles.ratingBox}>
            <h1 className={styles.rating}>4.8/5</h1>
            <div className={styles.starbox}>
                <FontAwesomeIcon icon={faStar} className={styles.star} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
                <FontAwesomeIcon icon={faStar} className={styles.star} />
            </div>
            <p className={styles.count}>(67 reviews)</p>
        </section>
        <section className={styles.stats}>
            <div className={styles.statBox}>
               <div className={styles.singleRatingBox}>
               <h1 className={styles.starCount}>5</h1>
               <FontAwesomeIcon icon={faStar} className={styles.statStar} />
               </div>
               <div className={styles.lineBox}>
                <div className={styles.line}></div>
               </div>
               <p className={styles.starRatingCount}>(23)</p>
            </div>
            <div className={styles.statBox}>
               <div className={styles.singleRatingBox}>
               <h1 className={styles.starCount}>5</h1>
               <FontAwesomeIcon icon={faStar} className={styles.statStar} />
               </div>
               <div className={styles.lineBox}>
                <div className={styles.line}></div>
               </div>
               <p className={styles.starRatingCount}>(23)</p>
            </div>
            <div className={styles.statBox}>
               <div className={styles.singleRatingBox}>
               <h1 className={styles.starCount}>5</h1>
               <FontAwesomeIcon icon={faStar} className={styles.statStar} />
               </div>
               <div className={styles.lineBox}>
                <div className={styles.line}></div>
               </div>
               <p className={styles.starRatingCount}>(23)</p>
            </div>
            <div className={styles.statBox}>
               <div className={styles.singleRatingBox}>
               <h1 className={styles.starCount}>5</h1>
               <FontAwesomeIcon icon={faStar} className={styles.statStar} />
               </div>
               <div className={styles.lineBox}>
                <div className={styles.line}></div>
               </div>
               <p className={styles.starRatingCount}>(23)</p>
            </div>
            <div className={styles.statBox}>
               <div className={styles.singleRatingBox}>
               <h1 className={styles.starCount}>5</h1>
               <FontAwesomeIcon icon={faStar} className={styles.statStar} />
               </div>
               <div className={styles.lineBox}>
                <div className={styles.line}></div>
               </div>
               <p className={styles.starRatingCount}>(23)</p>
            </div>
        </section>
    </main>
  )
}
