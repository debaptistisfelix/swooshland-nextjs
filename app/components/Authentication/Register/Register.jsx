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
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { signIn } from 'next-auth/react'


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
        if(data.email === "" || data.password === "" || data.name === ""){
            return toast.error("Please fill out all fields")
        }
        setLoading(true);
       try{
        const response = await axios.post("/api/register", data)
        .then(()=>{
            toast.success("Registration Successful!")
            setLoading(false);
            signIn("credentials", {
                ...data, 
                redirect:false,
            })
            .then((callback)=>{
            
                if(callback?.error){
                    toast.error("Email or Passowrd not valid.")
                    setData({email: "", password: ""})
                    setLoading(false);
                }
    
                if(callback?.ok && !callback?.error){
                    
                    toast.success("Login Successful!")
                    setLoggedIn(true);
                    setLoading(false);
                }
            })
          /*   setLoggedIn(true);
           setTimeout(()=>{
           
            router.push("/")
           }, 1000)  */
       
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
        {loading && <ThreeCirclesLoader />}
           {!loading && !loggedIn && <> <div className={styles.titleBox}>
                <h1 className={styles.title}>Join Swooshland</h1>
                <p className={styles.subtitle}>Create an account to get started.</p>
            </div>
            
            <form className={styles.form} onSubmit={registerUser}>
                <input
                onChange={(e)=>{setData({...data, email: e.target.value})}}
                type="text" placeholder='Email' className={`input ${styles.input}`} />
                <input
                onChange={(e)=>{setData({...data, name: e.target.value})}}
                type="text" placeholder='Username' className={`input ${styles.input}`} />
                <div className={styles.passwordBox}>
                    <input
                    onChange={(e)=>{setData({...data, password: e.target.value})}}
                    type={passwordShown ? "text" : "password"} placeholder='Password' className={`input ${styles.passwordInput}`} />
                    <FontAwesomeIcon
                    onClick={togglePasswordVisiblity}
                    icon={passwordShown === true ? faEye : faEyeSlash} className={styles.icon} />
                </div>
                <button
               
                type="submit" className={`${styles.registerBtn} mainButton`}>
                   Sign up
                </button>
                <p className={styles.alreadyReg}>Already a member?
                <Link className={`Link ${styles.logInLink}`} href="/login">Log in</Link>
                </p>
            </form></>}
           
            {!loading && loggedIn && <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />}
        </section>
    </main>
  )
}
