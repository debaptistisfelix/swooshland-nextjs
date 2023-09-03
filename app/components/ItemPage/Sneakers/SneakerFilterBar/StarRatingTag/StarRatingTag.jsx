import styles from './StarRatingTag.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';

export default function StarRatingTag({rating}) {

    const createStarsBasedOnCount = (count) => {
        let starIcons = []
      for(let i = 0; i < count; i++){
        starIcons.push(<FontAwesomeIcon key={uuidv4()} icon={faStar} className={styles.ratingIcon}/>)
      }
      return starIcons
    }

  return (
    <main className={styles.ratingContainer}>
        {createStarsBasedOnCount(rating)}
    </main>
  )
}
