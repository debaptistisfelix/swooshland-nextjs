import styles from './ReviewOverview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';

export default function ReviewOverview({item, itemReviews}) {
   const {ratingsAverage} = item;

   const GiveStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = (rating - fullStars) >= 0.5;
    

    let stars = [];
    for(let i = 0; i < fullStars; i++){
        stars.push(<FontAwesomeIcon key={i}  icon={faStar} className={styles.star} />)
       
    }

    if(halfStars){
        stars.push(<FontAwesomeIcon key={rating} icon={faStarHalf} className={styles.star} />)
        
    }
   
    return stars;
};

  const starCounts = [5, 4, 3, 2, 1]

  const calculatePercentage = (count) => {
      return (count / itemReviews.length) * 100;
  }

  const calculateRatingsAverage = useCallback(() => {
    let total = 0;
    for(let i = 0; i < itemReviews.length; i++){
        total += itemReviews[i].rating;
    }
    const newRAtingsAverage = (total / itemReviews.length).toFixed(1);
    if(newRAtingsAverage === "NaN"){
        return 0;
    } else {
        return newRAtingsAverage;
    }
}, [itemReviews])

  return (
    <main className={styles.section}>
        <section className={styles.ratingBox}>
            <h1 className={styles.rating}>{calculateRatingsAverage()}/5</h1>
            <div className={styles.starBox}>
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <div className={styles.fullStarBox}>
                {GiveStars(calculateRatingsAverage())}
                </div>
            </div>
            <p className={styles.count}>({itemReviews.length} review{itemReviews.length > 1 && "s"})</p>
        </section>
        <section className={styles.stats}>
            {starCounts.map((star, index) => {
               const starCount = itemReviews.filter(review => review.rating === star).length;
               const percentage = calculatePercentage(starCount);
               return <div key={index} className={styles.statBox}>
               <div className={styles.singleRatingBox}>
               <h1 className={styles.starCount}>{star}</h1>
               <FontAwesomeIcon icon={faStar} className={styles.statStar} />
               </div>
               <div className={styles.lineBox}>
                <div style={{width: `${percentage}%` }} className={styles.line}></div>
               </div>
               <p className={styles.starRatingCount}>({starCount})</p>
            </div>
            })}
           
        </section>
    </main>
  )
}
