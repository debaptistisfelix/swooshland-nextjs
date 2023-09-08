"use client"

import styles from './TrendingItems.module.css';
import { poppins } from '@app/fonts';
import ShopItemCard from '@app/components/ItemCards/ShopItemCard/ShopItemCard';
import { useState, useEffect } from 'react';
import NavSearchLoader from '@app/components/Navbar/NavbarSearch/NavSearchLoader/NavSearchLoader';
import { Suspense } from "react"
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError';
import getTrendingItems from '@app/libs/FetchingData/FetchingHomepage/fetchTrendingItems';

export default async  function TrendingItems({sneakers}) {
  console.log("sneakers: ", sneakers)
  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <h2 className={styles.title}>Trending Products</h2>
        <section className={styles.list}>
            {sneakers.length > 0  && sneakers.map((sneaker, index)=>{
                return <ShopItemCard key={index} sneaker={sneaker}/>
            })}
        </section>
    </main>
  )
} 

/* export default async  function TrendingItems({promise}) {
  try {
    const sneakers = await promise
  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <h2 className={styles.title}>Trending Products</h2>
        <Suspense fallback={<div className={styles.loaderContainer}>
          <NavSearchLoader /></div>}>
        <section className={styles.list}>
            {sneakers.length > 0  && sneakers.map((sneaker, index)=>{
                return <ShopItemCard key={index} sneaker={sneaker}/>
            })}
        </section>
        </Suspense>

        {isLoading && <div className={styles.loaderContainer}>
          <NavSearchLoader /></div>}

    </main>
  )
  } catch (error) {
    console.log(error)
    return (
      <main className={`${styles.section} ${poppins.className}`}>
          <h2 className={styles.title}>Trending Products</h2>
          <FetchingDataError />
      </main>
    )
  }
}  */

/* export default async  function TrendingItems() {
 const [sneakers, setSneakers] = useState([])
 const [isLoading, setIsLoading] = useState(false)
 const [error, setError] = useState(true)

 const fetchTrendingItems = async () => {
  setIsLoading(true)
  try {
    const response = await fetch(`/api/item/trending`);
    console.log("response: ", response)
    const data = await response.json();
    console.log("data: ", data)
    setError(false)
    setIsLoading(false)
    setSneakers(data)
  } catch (error) {
    setIsLoading(false)
    setError(true)
    setSneakers([])
    console.log("error: ", error)
  }
 }

useEffect(() => {
  fetchTrendingItems();
},[])


  console.log("trending items")
  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <h2 className={styles.title}>Trending Products</h2>
       
        <section className={styles.list}>
            {sneakers  && sneakers.map((sneaker, index)=>{
                return <ShopItemCard key={index} sneaker={sneaker}/>
            })}
             {isLoading && error !== true && <div className={styles.loaderContainer}>
          <NavSearchLoader /></div>}
          {isLoading === false && error === true &&   <div className={styles.loaderContainer}>
          <FetchingDataError /></div>}
        </section>
    </main>

  )
} 
 */