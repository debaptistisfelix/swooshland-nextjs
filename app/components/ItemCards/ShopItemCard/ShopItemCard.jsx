"use client"

import styles from './ShopItemCard.module.css';
import { poppins } from '@app/fonts';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ShopItemCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    }
  }, [])

    const toggleHoverState = () => {
      if(windowWidth > 1024){
        setIsHovered(!isHovered);
      }
    }

 

  return (
    <main className={`${styles.section} ${poppins.className}`}>
            <div  className={styles.imgBox}>
                <Image className={styles.image} src="/lust1.jpg" alt="shoe" fill={true}  />
                <div /* style={{opacity: isHovered === true ? 1 : 0}} */ className={styles.shader}>
                    <Link className={`Link ${styles.shopLink}`} href="/">Shop</Link>
                </div>
            </div>
            <div className={styles.text}>
                <h3 className={styles.product}>Jordan 1 Mid</h3>
                <div className={styles.starBox}>
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                    <FontAwesomeIcon icon={faStar} className={styles.star} />
                </div>
                
                <h3 className={styles.name}>Sin of Lust</h3>
                <h3 className={styles.price}>$289.90</h3>
                
            </div>
    </main>
  )
}
