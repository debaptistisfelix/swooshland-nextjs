"use client"

import { createContext, useState } from "react"

export const SneakersContext = createContext();

export default function SneakersContextProvider({children}) {
    const [selectedSorting, setSelectedSorting] = useState("Newest");
    const [selectedBrand, setSelectedBrand] = useState("All Brands");
    const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
    const [selectedRating, setSelectedRating] = useState("Any Rating");
    const [isOnSale, setIsOnSale] = useState(null);
    const itemsPerPage = 10;
    const [visibleItems, setVisibleItems] = useState([]);



    /* SORTING LOGINC */

    const handleSortChange = (sortFilter) =>{
        setSelectedSorting(sortFilter)
    }

    const applySorting = (listToSorter) => {
        let sortedItems = [...listToSorter]
        if(selectedSorting === "Newest") {
            sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, itemsPerPage)
            console.log("sorted items after sorting:", sortedItems)
            setVisibleItems(sortedItems)   
        
        } else if(selectedSorting === "Oldest") {
            sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, itemsPerPage)
            setVisibleItems(sortedItems)
            console.log("sorted items after sorting:", sortedItems)
            
        } else if(selectedSorting === "Highest Rating") {
            sortedItems.sort((a, b) => b.rating - a.rating).slice(0, itemsPerPage)
            setVisibleItems(sortedItems)
            console.log("sorted items after sorting:", sortedItems)
           
        } else if(selectedSorting === "Lowest Rating") {
            sortedItems.sort((a, b) => a.rating - b.rating).slice(0, itemsPerPage)
            setVisibleItems(sortedItems)
            console.log("sorted items after sorting:", sortedItems)
          
        }
        else if(selectedSorting === "Highest Price") {
            sortedItems.sort((a, b) => b.price - a.price).slice(0, itemsPerPage)
            setVisibleItems(sortedItems)
            console.log("sorted items after sorting:", sortedItems)
           
        } else if(selectedSorting === "Lowest Price") {
            sortedItems.sort((a, b) => a.price - b.price).slice(0, itemsPerPage)
            setVisibleItems(sortedItems)
            console.log("sorted items after sorting:", sortedItems)
          
        }
    }

    /* FILTERING LOGIC */

    const applyFiltering = (listToFilter) => {
        let filteredItems = [...listToFilter]

        if(selectedBrand !== "All Brands") {
            filteredItems = filteredItems.filter(sneaker => sneaker.brand === selectedBrand)
        }
        if(selectedPriceRange !== "All Prices"){
            filteredItems = filteredItems.filter(sneaker => sneaker.price <= selectedPriceRange)
        }
        if(selectedRating !== "Any Rating"){
            filteredItems = filteredItems.filter(sneaker => sneaker.rating === selectedRating)
        }
        if(isOnSale !== null){
            filteredItems = filteredItems.filter(sneaker => sneaker.onSale === isOnSale)
        }

        applySorting(filteredItems);
    }; 

    /* FILTERING BY SNEAKER BRAND  */

    const handleBrandFilterOptionChage = (option) => {
        setSelectedBrand(option)
    }


    /* LOADING MORE SNEAKERS TO PAGE LOGIC */
    const handleLoadMore = (sneakerList) => {
        const nextPageIndex = visibleItems.length + itemsPerPage;
        const nextItems = sneakerList.slice(0, nextPageIndex);
        setSelectedSorting("Newest");
        setVisibleItems(nextItems);
     
    }

    return (
        <SneakersContext.Provider value={{
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
          }}>
            {children}
        </SneakersContext.Provider>
    )
};
