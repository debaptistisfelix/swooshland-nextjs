import styles from './ReviewBlock.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';


export default function ReviewBlock({review, deleteReview}) {
  const [showDeletModal, setShowDeleteModal] = useState(false)
  const refElement = useRef(null)
  const {data: session} = useSession();
  const userId = review.userId;
  const itemId = review.itemId;
  const reviewId = review.id;
 
  
  useEffect(() => {
    const handleClickOutside = (e) => {
        if(refElement.current && !refElement.current.contains(e.target)){
            setShowDeleteModal(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
}, [])

useEffect(()=>{
    if(showDeletModal === true) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "unset"
    }
}, [showDeletModal])

const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeletModal)
}

  const giveStars = (rating) => {
    let stars = [];
    for(let i = 0; i < rating; i++){
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className={styles.star} />)
    }
    return stars;
};






  return (
    <main className={styles.block}>
        <div className={styles.topBox}>
            <h5 className={styles.user}>{review.authorName}</h5>
            <div className={styles.starBox}>
            <div className={styles.emptyStarBox}>
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <FontAwesomeIcon icon={faStar} className={styles.emptyStar} />
                    <div className={styles.fullStarBox}>
                {giveStars(review.rating)}
                </div>
                </div>
            </div>
        </div>
        <h1 className={styles.title}>
             {review.title}
        </h1>
        <p className={styles.reviewText}>{review.comment}</p>
        <p className={styles.date}>{review.createdAt.slice(0,10)}</p>
       {session && session.id === review.userId &&  <FontAwesomeIcon onClick={toggleDeleteModal} icon={faTrash} className={styles.trashIcon} />}
       {showDeletModal === true && <div className="modalContainer">
            <div ref={refElement} className="modal">
                <h1 className="modalTitle">Remove Review</h1>
                <p className="modalParag">Would you like todelete your Review?</p>
                <div className="modalBtnBox">
                    <button onClick={toggleDeleteModal} className="modalButton modalLeftButton">Cancel</button>
                    <button onClick={()=>{
                        setShowDeleteModal(false);
                        deleteReview(itemId, reviewId, userId)
                    }
                        } className="modalButton modalRightButton">Remove</button>
                </div>
            </div>
        </div>}
    </main>
  )
}
