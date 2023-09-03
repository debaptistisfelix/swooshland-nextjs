import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'



const GiveStars = ({rating}) => {
    const fullStars = Math.floor(rating);
    const halfStars = (rating - fullStars) >= 0.5;

    let stars = [];
    for(let i = 1; i < rating; i++){
        stars.push(<FontAwesomeIcon key={i}  icon={faStar} className={styles.star} />)
    }

    if(halfStars){
        stars.push(<FontAwesomeIcon key={rating} icon={faStarHalfAlt} className={styles.star} />)
    }
    return stars;
};

export default GiveStars;
