"use client"
import styles from './LoginSection.module.css'
import { useEffect } from 'react'
import Login from '@app/components/Authentication/Login/Login'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginSection() {
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
