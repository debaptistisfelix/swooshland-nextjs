import styles from './ReviewBlock.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function ReviewBlock({review}) {
  return (
    <main className={styles.block}>
        <div className={styles.topBox}>
            <h5 className={styles.user}>{review.username}</h5>
            <div className={styles.starBox}>
               {Array(review.rating).fill(<FontAwesomeIcon icon={faStar} className={styles.star} />)}
            </div>
        </div>
        <h1 className={styles.title}>
             {review.title}
        </h1>
        <p className={styles.reviewText}>{review.reviewBody}</p>
        <p className={styles.date}>{review.date}</p>
    </main>
  )
}
