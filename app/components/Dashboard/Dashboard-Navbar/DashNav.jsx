"use client"

import styles from './DashNav.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { poppins } from '@app/fonts'
import { signOut } from "next-auth/react"
import { useState } from 'react'
import LogOutModal from './LogOutModal/LogOutModal'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'


export default function DashNav() {
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const refElement = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e) => {
        if(refElement.current && !refElement.current.contains(e.target)){
          setShowLogOutModal(false)
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
}, [])

  useEffect(() => {
    if(showLogOutModal === true) {
      document.body.style.overflow = "hidden"
    }
    }), [showLogOutModal]

     const toggleLogOutModal = () => {
        setShowLogOutModal(!showLogOutModal);
    }

  return (
    <main className={`${styles.dashNav} ${poppins.className}`}>
        <Link href={pathname === "/dashboard" ? "/" : "/dashboard"} className={`Link ${styles.backBtnBox}`}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
            <span className={styles.backBtn}>Back to {pathname === "/dashboard" ? "Shop" :  "Dashboard"}</span>
        </Link>
     
        <div className={styles.links}>
            <Link className={`Link ${styles.dashboardLink}`} href="/dashboard/addresses">Addresses</Link>
            <Link className={`Link ${styles.dashboardLink}`} href="/dashboard/favorites">Favorites</Link>
            <Link className={`Link ${styles.dashboardLink}`} href="/dashboard/newsletter">Newsletter</Link>
            <Link className={`Link ${styles.dashboardLink}`} href="/dashboard/orders">Orders</Link>
            <button
            onClick={toggleLogOutModal}
            className={`${styles.dashboardLink} ${styles.logOutBtn}`}>Log out</button>
        
        </div>

        {showLogOutModal && <LogOutModal refElement={refElement} toggleLogOutModal={toggleLogOutModal} />}
    </main>
  )
}
