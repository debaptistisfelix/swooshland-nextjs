"use client"
import styles from './SneakerListing.module.css'
import { useState, useEffect } from 'react'
import FilterBar from '../SneakerFilterBar/FilterBar'
import { useContext } from 'react'
import { SneakersContext } from '@app/context/SneakersPageContext'

export default function SneakerListing({sneakers}) {
    const {
        applySorting,
        handleSortChange,
        selectedSorting,
        applyFiltering,
        handleBrandFilterOptionChage,
        selectedBrand,
        selectedPriceRange,
        selectedRating,
        isOnSale,    
        handleLoadMore,
        visibleItems,
        setVisibleItems,
        itemsPerPage,
          } = useContext(SneakersContext)
    

    const selectOptions = {
        title: "Sort by",
        options: [
            "Newest",
            "Oldest",
            "Highest Rating",
            "Lowest Rating",
            "Highest Price",
            "Lowest Price",
           
        ]
    }

    useEffect(()=>{
        setVisibleItems(sneakers.slice(0, itemsPerPage))
    },[])

    useEffect(()=>{
       applySorting(visibleItems)
    },[selectedSorting])

    useEffect(()=>{
        if(selectedBrand !== "All Brands" || selectedPriceRange !== "All Prices" || selectedRating !== "Any Rating" || isOnSale !== null) {
            applyFiltering(sneakers)
        } 
       
    },[ selectedBrand, selectedPriceRange, selectedRating, isOnSale])

    


    

    

   


  return (
    <main className={styles.section}>

        <FilterBar
        /* Sorting */
         selectOptions={selectOptions} 
         selectedOption={selectedSorting} 
         handleOptionChange={handleSortChange} 
         /* Brand filtering */
         selectedBrand={selectedBrand}
         handleBrandFilterOptionChage={handleBrandFilterOptionChage}   />

        <section className={styles.sneakerList}>
            {visibleItems.map(sneaker =>{
                return <div className={styles.shoe} key={sneaker.name}>
                    <h3 className={styles.shish}>{sneaker.name} </h3>
                    <h3 className={styles.shish}> {sneaker.price}</h3>
                    <h3 className={styles.shish}>{sneaker.date}</h3>
                    <h3 className={styles.shish}>{sneaker.brand}</h3>
                    <h3 className={styles.shish}>  {sneaker.rating}</h3>
                    
                </div>
            })}
        </section>
        {visibleItems.length < sneakers.length &&  <button onClick={()=>{handleLoadMore(sneakers)}} className={`${styles.loadMoreBtn}`}>Load more</button>  }
       
    </main>
  )
}
