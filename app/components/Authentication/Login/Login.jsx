"use client"

import styles from './Login.module.css'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { poppins } from '@app/fonts'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import CircularLoader from '@app/components/Loaders/CircularLoader/CircularLoader'



export default function Register() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [data, setData] = useState({email: "", password: ""})
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    }

    const loginUser = async (e)=>{
        e.preventDefault();
        setLoading(true);
        signIn("credentials", {
            ...data, 
            callbackUrl: "/dashboard"
        })
        .then((callback)=>{
            if(callback?.error){
                toast.error("Login Failed")
                setLoading(false);
            }

            if(callback?.ok && !callback?.error){
                toast.success("Login Successful!")
                setLoggedIn(true);
                setLoading(false);
            }
        })
    };

 

  return (
    <main className={`${styles.loginPage} ${poppins.className}`}>
        <section className={styles.loginCard}>
           
            <div className={styles.titleBox}>
                <h1 className={styles.title}>Welcome Back!</h1>
                <p className={styles.subtitle}>Log in using your credentials.</p>
            </div>
            {loading && <CircularLoader />}
            {!loading && !loggedIn &&  <form className={styles.form} onSubmit={loginUser}>
                <input
                onChange={(e)=>{setData({...data, email: e.target.value})}}
                type="text" placeholder='Email' className={styles.input} />
                
                <div className={styles.passwordBox}>
                    <input
                    onChange={(e)=>{setData({...data, password: e.target.value})}}
                    type={passwordShown ? "text" : "password"} placeholder='Password' className={styles.passwordInput} />
                    <FontAwesomeIcon
                    onClick={togglePasswordVisiblity}
                    icon={passwordShown === true ? faEye : faEyeSlash} className={styles.icon} />
                </div>
                <button
               
                type="submit" className={styles.loginBtn}>
                   Sign in
                </button>
                <button
                onClick={()=>{signIn("google", {callbackUrl:"/"})}}
                className={`${styles.loginBtn} ${styles.googleBtn}`}>
                    <FontAwesomeIcon icon={faGoogle} className={styles.googleIcon} />
                    Sign in with Google</button>
                <p className={styles.alreadyReg}>Not a member yet??
                <Link className={`Link ${styles.logInLink}`} href="/register">Sign up</Link>
                </p>
            </form>}
            {!loading && loggedIn && <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />}
        </section>
    </main>
  )
}
