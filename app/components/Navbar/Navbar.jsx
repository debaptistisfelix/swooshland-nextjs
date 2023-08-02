"use client"

import styles from './Navbar.module.css';
import Link from 'next/link';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavbarSearch from './NavbarSearch/NavbarSearch';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import MobileSearchPage from './NavbarSearch/MobileSearchPage';
import {  useSession } from 'next-auth/react'


export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(null);
    const [userLink, setUserLink] = useState('/login');
    const session = useSession();

 

    useEffect(()=>{
        if(session.status === 'authenticated'){
            setUserLink('/dashboard')
        } else {
           setUserLink('/login')
        }
    }, [session])

    useEffect(() => {
        const checkWindowWidth = () => {
            if(window.innerWidth > 600){
                setIsSearchOpen(null);
            }
        }

        checkWindowWidth();

        window.addEventListener('resize', checkWindowWidth);

        return () => {
            window.removeEventListener('resize', checkWindowWidth);
        }

    }, []);


    const closeSearchBox = () => {
        setIsSearchOpen(false);
    }

    const openSearchBox = () => {
        setIsSearchOpen(true);
    }

    console.log(session)

  
    return (
        <nav className={styles.navbar}>
        <Link className={`Link ${styles.logoLink}`} href="/">
        <h1 className={`${styles.logo} ${poppins.className}`}>SWOOSHLAND</h1>
        </Link>
        <ul className={styles.navLinks}>
            <li className={`${styles.navLink} ${poppins.className}`}>
                <Link className="Link" href="/sneakers">SNEAKERS</Link>
            </li>
            <li className={`${styles.navLink} ${poppins.className}`}>
                <Link className="Link" href="/accessories">ACCESSORIES</Link>
            </li>
        </ul>
        <div className={styles.iconBox}>
            <NavbarSearch />
           
           <Link className='Link' href={userLink}>
           <FontAwesomeIcon icon={faUser} className={styles.icon} />
           </Link>
           <Link className='Link' href="/cart">
           <FontAwesomeIcon icon={faCartShopping} className={`${styles.icon} ${styles.cartIcon}`} />
           </Link>
        </div>

        <MobileSearchPage closeSearchBox={closeSearchBox} isSearchOpen={isSearchOpen}  />
        </nav>
    )
}