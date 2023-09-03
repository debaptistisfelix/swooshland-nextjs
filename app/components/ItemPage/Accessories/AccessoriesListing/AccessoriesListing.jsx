"use client"

import styles from './AccessoriesListing.module.css'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AccessoresContext } from '@app/context/AccessoriesContext'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import FilterBar from '../AccessoriesFilterBar/DesktopFilterBar/FilterBar'
import MobileFilterPage from '../AccessoriesFilterBar/MobileFilterPage/MobileFilterPage'
import MobileFilterTagsContainer from '../AccessoriesFilterBar/MobileFilterTags/MobileFilterTagsContainer'
import ListingShopCard from '@app/components/ItemCards/ShopItemCard/ListingShopCard/ListingShopCard'

export default function AccessoriesListing({ mobileFiltersOpen, toggleMobileFilters}) {
    const {
        applySorting,
        handleSortChange,
        selectedSorting,
        applyFiltering,
   
        selectedCategory,
        selectedPriceRange,
        selectedRating,
        isOnSale,    
        selectedSex,
        noFiltersApplied,
        filtersAppliedToAccessories,
        handleLoadMore,
        visibleItems,
        setVisibleItems,
        filteredItems,
        filteredVisibleItems,
        itemsPerPage,
        isLoading,
        setIsLoading
    } = useContext(AccessoresContext)

    const [accessories, setAccessories] = useState([])


    const fetchAccessories = async ()=>{
        try{
          const response = await fetch("/api/item");
          const data = await response.json();
          const filteredData = data.filter(item => item.tag === "accessories")
          setAccessories(filteredData);
          setIsLoading(false)
        } catch(error){
          console.log(error)
        }
    }

    useEffect(()=>{
        fetchAccessories();
        }, [])

    useEffect(()=>{
        if(filtersAppliedToAccessories){
            applySorting(filteredVisibleItems)
        } else {
            applySorting(visibleItems)
        }
       
       
     },[selectedSorting])

    useEffect(()=>{
      if(accessories.length > 0){
        const initialItems = accessories.slice(0, itemsPerPage)
        setVisibleItems(initialItems)
        applySorting(initialItems)
      }
    },[accessories])

    console.log("visibleItems",visibleItems)
    console.log("filtered visible items", filteredVisibleItems)
    console.log("filters applied:", filtersAppliedToAccessories)

    

    useEffect(()=>{
         if(filtersAppliedToAccessories === true){
            applyFiltering(accessories)  
         }

         noFiltersApplied()
    },[ selectedCategory, selectedPriceRange, selectedRating, isOnSale, selectedSex])

   



  return (
    <main className={styles.section}>

        <MobileFilterPage mobileFiltersOpen={mobileFiltersOpen} toggleMobileFilters={toggleMobileFilters} />
        <MobileFilterTagsContainer />
         <FilterBar
        /* Sorting */
       
         selectedOption={selectedSorting} 
         handleOptionChange={handleSortChange} 
        
           />

    
    {isLoading === false ? <section className={`${styles.listAndBtnContainer} ${filtersAppliedToAccessories === true && styles.moveDown} ${filtersAppliedToAccessories === false && styles.moveUp}`}>
        
    <h1 className={`${styles.itemsCount}  
             `}>
         ({filtersAppliedToAccessories ? filteredVisibleItems.length : visibleItems.length} Accessories out of {filtersAppliedToAccessories ? filteredItems.length : accessories.length} Results)
         </h1>
        
         <section className={`${styles.accessoriesList} `}>
      
         
    {filtersAppliedToAccessories ? filteredVisibleItems.map(accessory =>{
                return <ListingShopCard sneaker={accessory} key={accessory.id} />
            }) : visibleItems.map(accessory =>{
                return <ListingShopCard sneaker={accessory} key={accessory.id} />
            })}


 
     </section>

     {filtersAppliedToAccessories ? (
         filteredItems.length > filteredVisibleItems.length && <button onClick={()=>{handleLoadMore(filteredItems, true)}} className={`${styles.loadMoreBtn}`}>Load more</button>
     ) : (
         visibleItems.length < accessories.length && <button onClick={()=>{handleLoadMore(accessories, false)}} className={`${styles.loadMoreBtn}`}>Load more</button>
     )}

     </section> :  <ThreeCirclesLoader />}
        
    
 </main>
  )
}
