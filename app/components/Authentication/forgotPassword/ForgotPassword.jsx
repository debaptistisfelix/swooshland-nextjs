"use client"

import styles from './ForgotPassword.module.css'
import { poppins } from '@app/fonts'
import { useState } from 'react'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { toast } from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e)=>{
    setEmail(e.target.value);
  }

  const resetInput = ()=>{
    setEmail("");
  }

  const goBackToTryAgain = ()=>{
    setError(false);
    setSent(false);
    setLoading(false);
    resetInput();
  }

  const submitEmail = async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const response = await fetch("/api/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
      })
      const data = await response.json();
      if(!response.ok){
        setError(true);
        setLoading(false);
        setSent(false);
        return;
      } else if(response.ok){
        setError(false);
        setLoading(false);
        setSent(true);
        resetInput();
        toast.success("Reset Token sent", {
          style: {
              backgroundColor: "#191919",
              color: "#fff",
          },
          iconTheme: {
              primary: "#fff",
              secondary: "#191919",
          },
      });
        return;
      }

    }catch(error){
      console.log(error);
      setError(true);
      setLoading(false);
      setSent(false);
    }
  }


  return (
    <main className={`${styles.forgotPage} ${poppins.className}`}>
       {loading && <ThreeCirclesLoader />}
       {!loading && !sent && !error &&  <section className={styles.forgotCard}>
          <form onSubmit={submitEmail} className={styles.form}>
            <h1 className={styles.title}>Password Forgot</h1>
            <p className={styles.parag}>Enter your email address and we will send you a link to reset your password.</p>
            <input value={email} onChange={handleInputChange} className={`input ${styles.input}`} type="email" placeholder='Email Address' />
            <button type="submit" className={`${styles.button} mainButton`}>Confirm</button>
          </form>
        </section> }
       {sent && !loading && !error &&  <section className={styles.confirmationBox}>
        <FontAwesomeIcon icon={faCircleCheck} className={styles.confIcon} />
        <h1 className={styles.confirmationTitle}>Reset Email Sent</h1>
        <Link href="/login" className='Link'>
        <p  className={styles.backLink}>Login</p>
        </Link>
        </section>}
        {!sent && !loading && error && <section className={styles.errorBox}>
        <FontAwesomeIcon icon={faCircleExclamation} className={styles.errIcon} />
        <h1 className={styles.errorTitle}>Email not Found</h1>
        <p className={`${styles.parag} ${styles.centerParag}`}>The email you are trying yo submit is not registered in our database.</p>
        <p onClick={goBackToTryAgain} className={styles.backLink}>Try again</p>
          </section>}
    </main>
  )
}
