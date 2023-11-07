"use client"

import styles from './TrendingItems.module.css';
import { poppins } from '@app/fonts';
import ShopItemCard from '@app/components/ItemCards/ShopItemCard/ShopItemCard';
import { useState, useEffect } from 'react';
import getTrendingItems from '@app/libs/FetchingData/FetchingHomepage/fetchTrendingItems';
import NavSearchLoader from '@app/components/Navbar/NavbarSearch/NavSearchLoader/NavSearchLoader';
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError';


export default function TrendingItems() {
  const [sneakers, setSneakers] = useState(null)
  const [trendingItemsLoadingState, setTrendingItemsLoadingState] = useState({
    isLoading: true,
    isError: false,
  })

  const fetchTrendingItems = async () => {
    try {
      setTrendingItemsLoadingState({ isLoading: true, isError:false });
      const data = await getTrendingItems();
      setSneakers(data)
      setTrendingItemsLoadingState({isLoading : false, isError:false})
  }
   catch (error) {
      setTrendingItemsLoadingState({isLoading : false, isError:true})
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchTrendingItems()
  },[])




  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <h2 className={styles.title}>Trending Products</h2>
        {trendingItemsLoadingState.isLoading === true && <div className={styles.loaderContainer}>
        <NavSearchLoader /></div>}
        {trendingItemsLoadingState.isError === true && <div className={styles.errorContainer}>
        <FetchingDataError /></div>}
        <section className={styles.list}>
            {sneakers && sneakers.length > 0 && trendingItemsLoadingState.isLoading === false && trendingItemsLoadingState.isError === false  && sneakers.map((sneaker, index)=>{
                return <ShopItemCard key={index} sneaker={sneaker}/>
            })}
        </section>
    </main>
  )
} 
