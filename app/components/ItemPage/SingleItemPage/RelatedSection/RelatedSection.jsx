"use client"

import styles from './RelatedSection.module.css'
import { poppins } from '@app/fonts'
import ShopItemCard from '@app/components/ItemCards/ShopItemCard/ShopItemCard'
import { useState, useEffect } from 'react'

export default function RelatedSection() {
  const [sneakers, setSneakers] = useState([])
       
  useEffect(()=>{
   fetchSneakers();
  },[])

   const fetchSneakers = async ()=>{
       try{
         const response = await fetch("/api/item");
         const data = await response.json();
       
         setSneakers(data);
       } catch(error){
         console.log(error)
       }
   }
  return (
    <main className={ `${styles.section} ${poppins.className}`}>
        <h1 className={styles.title}>You may also like</h1>
        <div className={styles.list}>
            {sneakers.length >0 && sneakers.slice(0, 4).map((sneaker, index) =>{
              return <ShopItemCard key={index} sneaker={sneaker} />
            })}
        </div>
    </main>
  )
}
