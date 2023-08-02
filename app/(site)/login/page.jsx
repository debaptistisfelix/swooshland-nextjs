"use client"

import styles from './page.module.css'

import Login from '@app/components/Authentication/Login/Login'
import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function LoginPage(){
    const session = useSession()
    const router = useRouter()
   
    useEffect(()=>{
        if(session.status === 'authenticated'){
            router.push('/dashboard')
        }
    })

    return (
        <main className={styles.loginPage}>
            <Login />
        </main>
    )
}
