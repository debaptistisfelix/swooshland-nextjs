"use client"
import styles from './SneakerListing.module.css'
import { useState, useEffect } from 'react'
import FilterBar from '../SneakerFilterBar/DesktopFilterBar/FilterBar'
import { useContext } from 'react'
import NavSearchLoader from '@app/components/Navbar/NavbarSearch/NavSearchLoader/NavSearchLoader'
import { SneakersContext } from '@app/context/SneakersPageContext'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import MobileFilterPage from '../SneakerFilterBar/MobileFilterPage/MobileFilterPage'
import MobileFilterTagsContainer from '../SneakerFilterBar/MobileFilterTags/MobileFilterTagsContainer/MobileFilterTagsContainer'
import ListingShopCard from '@app/components/ItemCards/ShopItemCard/ListingShopCard/ListingShopCard'
import {  useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function SneakerListing({sneakersList,location,  mobileFiltersOpen, toggleMobileFilters}) {
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

        const [checkingIfSelectedBrandIsInUrl, setCheckingIfSelectedBrandIsInUrl] = useState(true)
        const searchParams = useSearchParams()
        const brand = searchParams.get("brand")
    
  

          
       const [sneakers, setSneakers] = useState([])
       
       useEffect(()=>{
        setSneakers(sneakersList);
       
       },[])

  
       
        useEffect(()=>{
          
            if(brand && sneakers.length > 0){
           
                setIsLoading(true)
               setTimeout(()=>{
                handleMultipleBrandFilterOptionChange(brand);
                 setIsLoading(false)
                 setCheckingIfSelectedBrandIsInUrl(false)
                }, 1000)
            } else if(!brand){
                setCheckingIfSelectedBrandIsInUrl(false)
            }
        },[brand, sneakers])

 
        const handleAction = () => {
            const urlWithoutQuery = window.location.origin + window.location.pathname;
            console.log(urlWithoutQuery)
            window.history.replaceState({}, document.title, urlWithoutQuery);
          };

    useEffect(()=>{
        if(filtersAppliedToSneakers){
            
            applySorting(filteredVisibleItems)
        } else {
            
            applySorting(visibleItems)
            handleAction()
            
        }
       
       
     },[selectedSorting, filtersAppliedToSneakers])

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
    <>
    {checkingIfSelectedBrandIsInUrl === true ? <div className={styles.loaderContainer}>
        <NavSearchLoader />
    </div> :     <main className={`${styles.section} ${brand && styles.slowEntrance}`}>
       {/* Mobile Components */}
        <MobileFilterPage mobileFiltersOpen={mobileFiltersOpen} toggleMobileFilters={toggleMobileFilters} />
        <MobileFilterTagsContainer />

        {/* Desktop Components */}
        <FilterBar
        /* Sorting */
       
         selectedOption={selectedSorting} 
         handleOptionChange={handleSortChange} 
        
           />


       
      <Suspense fallback={<ThreeCirclesLoader />}>
      <section className={`${styles.listAndBtnContainer} ${filtersAppliedToSneakers === true && styles.moveDown} ${filtersAppliedToSneakers === false && styles.moveUp}`}> 

<h1 className={`${styles.itemsCount}  `}>
     ({filtersAppliedToSneakers ? filteredVisibleItems.length : visibleItems.length} Sneakers out of {filtersAppliedToSneakers ? filteredItems.length : sneakers?.length} Results)
     </h1>

<section className={`${styles.sneakerList}`}>
  


     {filtersAppliedToSneakers ? filteredVisibleItems.map(sneaker =>{
        return <ListingShopCard sneaker={sneaker} key={sneaker.id} />
     }) : visibleItems.map(sneaker =>{
        return <ListingShopCard sneaker={sneaker} key={sneaker.id} />
     })}


     </section>

     {filtersAppliedToSneakers ? (
     filteredItems.length > filteredVisibleItems.length && <button onClick={()=>{handleLoadMore(filteredItems, true)}} className={`${styles.loadMoreBtn}  `}>Load more</button>
     ) : (
     visibleItems.length < sneakers?.length && <button onClick={()=>{handleLoadMore(sneakers, false)}} className={`${styles.loadMoreBtn}`}>Load more</button>
     )}

 </section> 
        </Suspense>
           
            
       
    </main>}
    </>
  )
}
