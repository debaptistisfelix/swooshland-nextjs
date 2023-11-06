"use client"

import styles from './Navbar.module.css';
import Link from 'next/link';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavbarSearch from './NavbarSearch/NavbarSearch';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import MobileSearchPage from './NavbarSearch/MobileSearchPage';
import {  useSession } from 'next-auth/react'
import { CartContext } from '@app/context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { deleteCookie} from 'cookies-next';
import { usePathname } from 'next/navigation';


export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(null);
    const [userLink, setUserLink] = useState('/login');
   const { data: session, status} = useSession();
    const {
        cartItems,
        fetchCartItems,
        setGuestIdForNotLoggedUsers,
        fetchGuestCartItems,
        isCartLoading,
        checkIfThereAreExpiredCartItems
    } = useContext(CartContext);
    const pathName = usePathname();

    


    useEffect(()=>{
        if(status === 'authenticated'){
            setUserLink('/dashboard')
                fetchCartItems(); 
        } else if(status === 'unauthenticated'){
            setUserLink('/login')
            setGuestIdForNotLoggedUsers();
                fetchGuestCartItems();
        }else {
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

    useEffect(()=>{
        checkIfThereAreExpiredCartItems()
    }, [])


    const closeSearchBox = () => {
        setIsSearchOpen(false);
    }

    const openSearchBox = () => {
        setIsSearchOpen(true);
    }

   



  
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
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.iconGlassMobile} onClick={openSearchBox} />
            <NavbarSearch  />
          
           <Link className='Link' href={userLink}>
           <FontAwesomeIcon icon={faUser} className={styles.icon} />
           </Link>
           <Link className={`Link ${styles.cartBox}`} href="/cart">
           <FontAwesomeIcon icon={faCartShopping} className={`${styles.icon} ${styles.cartIcon}`} />
           {cartItems.length > 0 && <span className={styles.cartItemCount}>{cartItems.length}</span>}
           {isCartLoading.fetchingCartItems === true && cartItems.length === 0  && <div className={styles.cartLoader}></div>}
           </Link>
        </div>

        <MobileSearchPage closeSearchBox={closeSearchBox} isSearchOpen={isSearchOpen}   />
        </nav>
    )
}