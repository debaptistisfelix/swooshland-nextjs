import styles from './SearchCard.module.css';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchCard({item, closeSearchBox}) {
    const GiveStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = (rating - fullStars) >= 0.5;
        
    
        let stars = [];
        for(let i = 0; i < rating; i++){
            stars.push(<FontAwesomeIcon key={i}  icon={faStar} className={styles.star} />)
           
        }
    
        if(halfStars){
            stars.push(<FontAwesomeIcon key={rating} icon={faStarHalf} className={styles.star} />)
           
        }
       
        return stars;
    };


    const {model, name, price, images, ratingsAverage, onSale, discountPercentage, id, gender} = item;


  return (
    <main className={`${styles.card} ${poppins.className}`}>
       <Link onClick={closeSearchBox} className={`Link ${styles.linkContainer}`} href={`/item/${id}`}>
       <section className={styles.imgBox}>
            <Image className={styles.img} src={`/${images[0]}`} fill={true} alt="sneaker" />
            {onSale === true &&  <h3 className={styles.discountTag}>-{discountPercentage}%</h3>}
        </section>
        <section className={styles.textBox}>
            <h1 className={styles.title}>{model}</h1>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.starBox}>
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                <div className={styles.fullStarBox}>
                {GiveStars(ratingsAverage)}
                </div>
            </div>
           <div className={styles.priceBox}>
           {onSale === true && <h1 className={styles.discountedPrice}>${(price - (price * (discountPercentage / 100))).toFixed(2)}</h1>}
           <h1 className={`${styles.price} ${onSale === true && styles.lineThrough}`}>${price.toFixed(2)}</h1>
           </div>
           <h3 className={`${styles.genderTag} ${gender === "Men" ? styles.menGender : styles.womenGender}`}>{gender === "Men" ? "MNS" : "WMNS"}</h3>
        </section>
       </Link>
   </main>
  )
}
