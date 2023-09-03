"use client"

import styles from './ResetPassword.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { poppins } from '@app/fonts'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'next/navigation'


export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);
    const [error, setError] = useState({
        expiredError: false,
        networkError: false
    });
    const params = useParams();

   const thereIsAnError = error.expiredError || error.networkError;

    const handlePasswordInputChange = (e)=>{
        setPassword(e.target.value);
    }

    const handlePasswordConfirmInputChange = (e)=>{
        setPasswordConfirm(e.target.value);
    }

    const resetInputs = ()=>{
        setPassword("");
        setPasswordConfirm("");
    }

    const submitResetRequest = async (e)=>{
        e.preventDefault();
        if(password !== passwordConfirm){
            toast.error("Passwords do not match", {
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
        try{
            setLoading(true);
            const {token} = params;
            const response = await fetch(`/api/resetPassword/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password: password})
            })
            const data = await response.json();
            if(response.status === 400){
                setError({
                    expiredError: true,
                    networkError: false
                })
                setLoading(false);
                setResetComplete(false);
                resetInputs();
                return;
            } else if(response.status === 200){
                setError({
                    expiredError: false,
                    networkError: false
                })
                setLoading(false);
                setResetComplete(true);
                resetInputs();
                toast.success("Password reset Complete", {
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
        }
        catch(error){
            console.log(error)
            setError(true);
            setLoading(false);
            setResetComplete(false);
            resetInputs();
        }
    }
  return (
    <main className={`${styles.resetPage} ${poppins.className}`}>
       {loading && <ThreeCirclesLoader />}
       {!loading && !resetComplete && !thereIsAnError &&  <section className={styles.resetCard}>
          <form onSubmit={submitResetRequest} className={styles.form}>
            <h1 className={styles.title}>Password Reset</h1>
            <p className={styles.parag}>Enter your new Password and then just confirm by clicking on the button below</p>
            <input value={password} onChange={handlePasswordInputChange}  className={`input ${styles.input}`} type="password" placeholder='Password' />
            <input value={passwordConfirm} onChange={handlePasswordConfirmInputChange} className={`input ${styles.input}`} type="password" placeholder='Password Confirm' />
            <button type="submit" className={`${styles.button} mainButton`}>Confirm</button>
          </form>
        </section> }
       {resetComplete && !loading && !thereIsAnError &&  <section className={styles.confirmationBox}>
        <FontAwesomeIcon icon={faCircleCheck} className={styles.confIcon} />
        <h1 className={styles.confirmationTitle}>Password Reset Completed</h1>
        <Link href="/login" className='Link'>
        <p  className={styles.backLink}>Login</p>
        </Link>
        </section>}
        {!resetComplete && !loading && error.expiredError && <section className={styles.errorBox}>
        <FontAwesomeIcon icon={faCircleExclamation} className={styles.errIcon} />
        <h1 className={styles.errorTitle}>Reset Token Expired</h1>
        <p className={`${styles.parag} ${styles.centerParag}`}>Your Reset token expired. Please request another token</p>
        <Link href="/forgotPassword" className='Link'>
        <p  className={styles.backLink}>Try again</p></Link>
          </section>}
          {!resetComplete && !loading && error.networkError && <section className={styles.errorBox}>
        <FontAwesomeIcon icon={faCircleExclamation} className={styles.errIcon} />
        <h1 className={styles.errorTitle}>Network Error</h1>
        <p className={`${styles.parag} ${styles.centerParag}`}>An error occurred while trying to change your password. please retry.</p>
       
        <p onClick={()=>{
            setError({
                expiredError: false,
                networkError: false
            })
        }}  className={styles.backLink}>Try again</p>
          </section>}
    </main>
  )
}
