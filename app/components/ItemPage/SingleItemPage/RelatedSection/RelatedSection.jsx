"use client"

import styles from './RelatedSection.module.css'
import { poppins } from '@app/fonts'
import { useState, useEffect } from 'react'
import ShopItemCard from '@app/components/ItemCards/ShopItemCard/ShopItemCard'
import getItemRelated from '@app/libs/FetchingData/FetchingSinglItemData/fetchItemRelated'
import NavSearchLoader from '@app/components/Navbar/NavbarSearch/NavSearchLoader/NavSearchLoader'
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError'

export default function RelatedSection({id}) {
  const [sneakers, setSneakers] = useState(null)
  const [fetchingRelatedState, setFetchingRelatedState] = useState({
    isLoading: true,
    isError: false,
  })
 


  const fetchRelated = async () => {
    try {
      setFetchingRelatedState({
        isLoading: true,
        isError: false,
      })
      const data = await getItemRelated(id);
      setSneakers(data);
      setFetchingRelatedState({
        isLoading: false,
        isError: false,
      })
    } catch (error) {
      console.log(error);
      setFetchingRelatedState({
        isLoading: false,
        isError: true,
      })
    }
  }

  useEffect(() => {
    fetchRelated()
  },[]);


  
  return (
    <main className={ `${styles.section} ${poppins.className}`}>
        <h1 className={styles.title}>You may also like</h1>
       {fetchingRelatedState.isLoading && <div className={styles.loaderContainer}>
       <NavSearchLoader /></div>}
       
        {fetchingRelatedState.isError && <div className={styles.errorContainer}>
          <FetchingDataError />
          </div>}
        {fetchingRelatedState.isLoading === false && fetchingRelatedState.isError === false && <div className={styles.list}>
            {sneakers !== null && sneakers.length >0  && sneakers.map((sneaker, index) =>{
              return <ShopItemCard key={index} sneaker={sneaker} />
            })}
        </div>}
    </main>
  )
}
