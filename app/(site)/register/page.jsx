"use client"

import styles from './page.module.css'
import { useEffect } from 'react'
import Register from '@app/components/Authentication/Register/Register'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function RegisterPage(){
    const session = useSession()
    const router = useRouter()
   
    useEffect(()=>{
        if(session.status === 'authenticated'){
            router.push('/dashboard')
        }
    })

    return (
        <main className={styles.registerPage}>
            <Register />
        </main>
    )
}
