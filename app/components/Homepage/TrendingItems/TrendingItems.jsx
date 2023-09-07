"use client"

import styles from './TrendingItems.module.css';
import { poppins } from '@app/fonts';
import ShopItemCard from '@app/components/ItemCards/ShopItemCard/ShopItemCard';
import { useState, useEffect } from 'react';
import NavSearchLoader from '@app/components/Navbar/NavbarSearch/NavSearchLoader/NavSearchLoader';
import { Suspense } from "react"
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError';

export default async  function TrendingItems({promise}) {
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
        {/* {isLoading && <div className={styles.loaderContainer}>
          <NavSearchLoader /></div>} */}
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
}
