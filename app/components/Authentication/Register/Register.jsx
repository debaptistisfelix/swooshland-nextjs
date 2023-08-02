"use client"

import styles from './Register.module.css'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { poppins } from '@app/fonts'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import CircularLoader from '@app/components/Loaders/CircularLoader/CircularLoader'
import Image from 'next/image'


export default function Register() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [data, setData] = useState({email: "", name: "", password: ""})
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    }

    const registerUser = async (e)=>{
        e.preventDefault();
        setLoading(true);
       try{
        const response = await axios.post("/api/register", data)
        .then(()=>{
            toast.success("Registration Successful!")
            setLoading(false);
            setLoggedIn(true);
           setTimeout(()=>{
           
            router.push("/")
           }, 1000)
       
        })
       } catch(error){
            console.log(error)
            setLoading(false);
            setLoggedIn(false);
            toast.error(error.response.data)
       }
    };

 

  return (
    <main className={`${styles.registerPage} ${poppins.className}`}>
        <section className={styles.registerCard}>
           
            <div className={styles.titleBox}>
                <h1 className={styles.title}>Join Swooshland</h1>
                <p className={styles.subtitle}>Create an account to get started.</p>
            </div>
            {loading && <CircularLoader />}
            {!loading && !loggedIn &&  <form className={styles.form} onSubmit={registerUser}>
                <input
                onChange={(e)=>{setData({...data, email: e.target.value})}}
                type="text" placeholder='Email' className={styles.input} />
                <input
                onChange={(e)=>{setData({...data, name: e.target.value})}}
                type="text" placeholder='Username' className={styles.input} />
                <div className={styles.passwordBox}>
                    <input
                    onChange={(e)=>{setData({...data, password: e.target.value})}}
                    type={passwordShown ? "text" : "password"} placeholder='Password' className={styles.passwordInput} />
                    <FontAwesomeIcon
                    onClick={togglePasswordVisiblity}
                    icon={passwordShown === true ? faEye : faEyeSlash} className={styles.icon} />
                </div>
                <button
               
                type="submit" className={styles.registerBtn}>
                   Sign up
                </button>
                <p className={styles.alreadyReg}>Already a member?
                <Link className={`Link ${styles.logInLink}`} href="/login">Log in</Link>
                </p>
            </form>}
            {!loading && loggedIn && <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />}
        </section>
    </main>
  )
}
