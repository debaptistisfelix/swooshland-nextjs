"use client"

import styles from './Login.module.css'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { poppins } from '@app/fonts'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { useParams } from 'next/navigation'


export default function Register() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [data, setData] = useState({email: "", password: ""})
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
   const params = useParams();
   const itemId = params.itemId;


    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    }




    const loginUser = async (e)=>{
        let redirectUrl;
        if(!itemId){
            redirectUrl = "/dashboard";
        } else {
            redirectUrl = `/reviewPage/${itemId}`;
        }
        e.preventDefault();
        if(data.email === "" || data.password === ""){
            toast.error("Please provide email and password", {
                style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
            })
            return;
        }
        setLoading(true);
        signIn("credentials", {
            ...data, 
            redirect:false,
            callbackUrl: redirectUrl,
        })
        .then((callback)=>{
            
            if(callback?.error){
                toast.error("Email or Passowrd not valid.", {
                    style: {
                        backgroundColor: "#191919",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#191919",
                    },
                })
                setData({email: "", password: ""})
                setLoading(false);
            }

            if(callback?.ok && !callback?.error){
                
                toast.success("Login Successful!", {
                    style: {
                        backgroundColor: "#191919",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#191919",
                    },
                })
                setLoggedIn(true);
                setLoading(false);
            }
        })
    };


  return (
    <main className={`${styles.loginPage} ${poppins.className}`}>
        <section className={styles.loginCard}>
           
            {loading  && <ThreeCirclesLoader />}
            {!loading && !loggedIn && <><div className={styles.titleBox}>
                <h1 className={styles.title}>Welcome Back!</h1>
                <p className={styles.subtitle}>Log in using your credentials.</p>
            </div>
            
             <form className={styles.form} onSubmit={loginUser}>
                <input
               
                onChange={(e)=>{setData({...data, email: e.target.value})}}
                type="text" placeholder='Email' className={`input ${styles.input}`} />
                
                <div className={styles.passwordBox}>
                    <input
                   
                    onChange={(e)=>{setData({...data, password: e.target.value})}}
                    type={passwordShown ? "text" : "password"} placeholder='Password' className={`input ${styles.passwordInput}`} />
                    <FontAwesomeIcon
                    onClick={togglePasswordVisiblity}
                    icon={passwordShown === true ? faEye : faEyeSlash} className={styles.icon} />
                    <Link href="/forgotPassword" className={`Link ${styles.forgotLink}`}>
                <p className={styles.forgotPasswordText}>Forgot Password</p></Link>
                </div>
                
                <button
               
                type="submit" className={`${styles.loginBtn} mainButton`}>
                   Sign in
                </button>
               
                
            </form>
            <button
                type="button"
                onClick={()=>{
                    let redirectUrl;
                    if(!itemId){
                        redirectUrl = "/dashboard";
                    } else {
                        redirectUrl = `/reviewPage/${itemId}`;
                    }
                    setLoading(true);
                    signIn("google", {callbackUrl:redirectUrl});
                }}
                className={`mainButton ${styles.googleBtn}`}>
                    <FontAwesomeIcon icon={faGoogle} className={styles.googleIcon} />
                    Sign in with Google</button>
                    <p className={styles.alreadyReg}>Not a member yet??
                <Link className={`Link ${styles.logInLink}`} href="/register">Sign up</Link>
                </p></> }
            {!loading && loggedIn && <div className={styles.confirmBox}>
            <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />
            <p className={styles.confirmText}>Redirecting to your Dashboard.</p>
            </div>}
        </section>
    </main>
  )
}
