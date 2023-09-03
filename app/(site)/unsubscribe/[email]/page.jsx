"use client"

import styles from './page.module.css'
import { poppins } from '@app/fonts'
import { useState, useEffect } from 'react'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import { useParams } from 'next/navigation'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast'

export default function page() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [alreadyDeleted, setAlreadyDeleted] = useState(false);

    const params = useParams();
    const {email} = params;
    const decodedEmail = decodeURIComponent(email.split('/').pop());

    const handleUnsubscribe = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/unsubscribe/${decodedEmail}`, {
                method:"PATCH", 
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            console.log(data);
           if(response.status === 404){
            setIsLoading(false);
            setError(false);
            setAlreadyDeleted(true);
           } else {
            setIsLoading(false);
            toast.success("You succesfully unsubscribed from our Monthly Newsletter", {
                style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
            })
           }
        } catch (error) {
            console.log(error)
            setError(true);
            setIsLoading(false);
            toast.error("There was a Network error while trying to unsubscribe. Please retry.", {
                style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
            })
        }
    };

    useEffect(() => {
        handleUnsubscribe();
    },[])
  return (
    <main className={`pageContainer ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Shop" />
        <section  className={`pageContent ${styles.unsubscribeSection}`}>
            {isLoading === true && <ThreeCirclesLoader />}
            {isLoading === false && error === false && alreadyDeleted === false &&  <div className={styles.confirmBox}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.icon} />
                <p className={styles.text}>You succesfully unsubscribed from our Monthly Newsletter</p>
                </div>}
                {isLoading === false && error === true && <div className={styles.confirmBox}>
                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                <p className={styles.text}>Network Error</p>
                <button onClick={handleUnsubscribe} className={`${styles.btn} ${poppins.className}`}>Try again</button>
                    </div>}
            {isLoading === false && error === false && alreadyDeleted === true && <div className={styles.confirmBox}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.icon} />
                <p className={styles.text}>You've already unsubscribed from our Monthly Newsletter!</p>
                </div>}
        </section>
    </main>
  )
}
