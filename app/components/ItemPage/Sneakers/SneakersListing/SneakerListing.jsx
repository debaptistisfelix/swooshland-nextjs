"use client"
import styles from './SneakerListing.module.css'
import { useState, useEffect } from 'react'
import FilterBar from '../SneakerFilterBar/DesktopFilterBar/FilterBar'
import { useContext } from 'react'
import queryString from 'query-string';
import { SneakersContext } from '@app/context/SneakersPageContext'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import MobileFilterPage from '../SneakerFilterBar/MobileFilterPage/MobileFilterPage'
import MobileFilterTagsContainer from '../SneakerFilterBar/MobileFilterTags/MobileFilterTagsContainer/MobileFilterTagsContainer'
import ListingShopCard from '@app/components/ItemCards/ShopItemCard/ListingShopCard/ListingShopCard'
import { usePathname, useParams, useSearchParams } from 'next/navigation'


export default function SneakerListing({location,  mobileFiltersOpen, toggleMobileFilters}) {
    const {
        applySorting,
        handleSortChange,
        selectedSorting,
        applyFiltering,
   
        selectedBrand,
        handleMultipleBrandFilterOptionChange,
        selectedPriceRange,
        selectedRating,
        isOnSale,    
        selectedSex,
        noFiltersApplied,
        filtersAppliedToSneakers,
        handleLoadMore,
        visibleItems,
        setVisibleItems,
        filteredItems,
        filteredVisibleItems,
        itemsPerPage,
        isLoading,
      setIsLoading
          } = useContext(SneakersContext)

        
        const searchParams = useSearchParams()
        const brand = searchParams.get("brand")
    
  
    
          
       const [sneakers, setSneakers] = useState([])
       
       useEffect(()=>{
        
        fetchSneakers();
       },[])

        const fetchSneakers = async ()=>{
            try{
              const response = await fetch("/api/item");
              const data = await response.json();
              const filteredData = data.filter(item => item.tag === "sneakers")
              setSneakers(filteredData);
              setIsLoading(false)
            } catch(error){
              console.log(error)
            }
        }
       
        useEffect(()=>{
          
            if(brand && sneakers.length > 0){
           
                setIsLoading(true)
               setTimeout(()=>{handleMultipleBrandFilterOptionChange(brand); setIsLoading(false)}, 1000)
            }
        },[brand, sneakers])

   

    useEffect(()=>{
        if(filtersAppliedToSneakers){
            
            applySorting(filteredVisibleItems)
        } else {
            
            applySorting(visibleItems)
        }
       
       
     },[selectedSorting])

    useEffect(()=>{
      
        if(sneakers.length > 0){
        const initialItems = sneakers.slice(0, itemsPerPage)
        setVisibleItems(initialItems)
        applySorting(initialItems)
        }
    },[sneakers])

    

    useEffect(()=>{
        
         if(filtersAppliedToSneakers === true){
            applyFiltering(sneakers)  
         }
         
         noFiltersApplied()
    },[ selectedBrand, selectedPriceRange, selectedRating, isOnSale, selectedSex])

   


    

    

   


  return (
    <main className={`${styles.section} ${brand && styles.slowEntrance}`}>
       {/* Mobile Components */}
        <MobileFilterPage mobileFiltersOpen={mobileFiltersOpen} toggleMobileFilters={toggleMobileFilters} />
        <MobileFilterTagsContainer />

        {/* Desktop Components */}
        <FilterBar
        /* Sorting */
       
         selectedOption={selectedSorting} 
         handleOptionChange={handleSortChange} 
        
           />


       
       {isLoading === false ? <section className={`${styles.listAndBtnContainer} ${filtersAppliedToSneakers === true && styles.moveDown} ${filtersAppliedToSneakers === false && styles.moveUp}`}> 

       <h1 className={`${styles.itemsCount}  `}>
            ({filtersAppliedToSneakers ? filteredVisibleItems.length : visibleItems.length} Sneakers out of {filtersAppliedToSneakers ? filteredItems.length : sneakers?.length} Results)
            </h1>

       <section className={`${styles.sneakerList}`}>
         
       

            {filtersAppliedToSneakers ? filteredVisibleItems.map(sneaker =>{
               /*  return <div className={styles.shoe} key={sneaker.name}>
                    <h3 className={styles.shish}>{sneaker.name} </h3>
                    <h3 className={styles.shish}> {sneaker.price}</h3>
                    <h3 className={styles.shish}>{sneaker.date}</h3>
                    <h3 className={styles.shish}>{sneaker.brand}</h3>
                    <h3 className={styles.shish}>  {sneaker.rating}</h3>
                    <h3 className={styles.shish}> {sneaker.onSale === true ? "On Sale" : "Not on Sale"}</h3>
                    <h3 className={styles.shish}>  {sneaker.for}</h3>
                </div> */ return <ListingShopCard sneaker={sneaker} key={sneaker.id} />
            }) : visibleItems.map(sneaker =>{
                /* return <div className={styles.shoe} key={sneaker.name}>
                    <h3 className={styles.shish}>{sneaker.name} </h3>
                    <h3 className={styles.shish}> {sneaker.price}</h3>
                    <h3 className={styles.shish}>{sneaker.date}</h3>
                    <h3 className={styles.shish}>{sneaker.brand}</h3>
                    <h3 className={styles.shish}>  {sneaker.rating}</h3>
                    <h3 className={styles.shish}> {sneaker.onSale === true ? "On Sale" : "Not on Sale"}</h3>
                    <h3 className={styles.shish}>  {sneaker.for}</h3>
                </div> */ return <ListingShopCard sneaker={sneaker} key={sneaker.id} />
            })}

    
            </section>

            {filtersAppliedToSneakers ? (
            filteredItems.length > filteredVisibleItems.length && <button onClick={()=>{handleLoadMore(filteredItems, true)}} className={`${styles.loadMoreBtn}  `}>Load more</button>
            ) : (
            visibleItems.length < sneakers?.length && <button onClick={()=>{handleLoadMore(sneakers, false)}} className={`${styles.loadMoreBtn}`}>Load more</button>
            )}

        </section> : 
            <ThreeCirclesLoader />}
            
       
    </main>
  )
}
