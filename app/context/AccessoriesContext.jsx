"use client"

import { createContext, useState } from "react"
import StarRatingTag from "@app/components/ItemPage/Sneakers/SneakerFilterBar/StarRatingTag/StarRatingTag";
import styles from "@app/components/ItemPage/Sneakers/SneakerFilterBar/DesktopFilterBar/FilterBar.module.css";

export const AccessoresContext = createContext();

export default function AccessoriesContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    /* Sorting state */
    const [selectedSorting, setSelectedSorting] = useState("Newest");
    /* Filtering states */
    const [filtersAppliedToAccessories, setFiltersAppliedToAccessories] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filteredVisibleItems, setFilteredVisibleItems] = useState([]);
    /* Single Filtering per type state */
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedSex, setSelectedSex] = useState("Any genre");
    const [isOnSale, setIsOnSale] = useState(null);
    /* Pagination states */
    const itemsPerPage = 10;
    const [visibleItems, setVisibleItems] = useState([]);

    const calculateEffectivePrice = (item) =>{
        if(item.onSale === true){
            return item.price - (item.price * (item.discountPercentage / 100))
        } else if(item.onSale === false){
            return item.price
        }
    }

     /* SORTING LOGINC */

     const handleSortChange = (sortFilter) =>{
        setSelectedSorting(sortFilter)
    }

    const applySorting = (listToSorter) => {
       
        
        let sortedItems = [...listToSorter]
     
        if(selectedSorting === "Newest") {
            sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            
              
        
        } else if(selectedSorting === "Oldest") {
            sortedItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            
            
        } else if(selectedSorting === "Highest Rating") {
            sortedItems.sort((a, b) => b.ratingsAverage - a.ratingsAverage)
            
             
        } else if(selectedSorting === "Lowest Rating") {
            sortedItems.sort((a, b) => a.ratingsAverage - b.ratingsAverage)
            
             
        }
        else if(selectedSorting === "Highest Price") {
            sortedItems.sort((a, b) => calculateEffectivePrice(b) - calculateEffectivePrice(a))
            
             
        } else if(selectedSorting === "Lowest Price") {
            sortedItems.sort((a, b) => calculateEffectivePrice(a) - calculateEffectivePrice(b))
            
             
        }

        const slicedItems = sortedItems.slice(0, itemsPerPage)
        filtersAppliedToAccessories ? setFilteredVisibleItems(slicedItems) : setVisibleItems(slicedItems) ;
       
    }

     /* FILTERING LOGIC */

     const applyFiltering = (listToFilter) => {
       
        let filteredItemsArray = [...listToFilter]

       /*  if(selectedBrand !== "All Brands") {
            filteredItemsArray = filteredItemsArray.filter(sneaker => sneaker.brand === selectedBrand);
           
        } */
        if(selectedCategory.length > 0) {
            filteredItemsArray = filteredItemsArray.filter(accessory => selectedCategory.includes(accessory.category));
        }
        if(selectedPriceRange !== "All Prices"){
            filteredItemsArray = filteredItemsArray.filter(accessory => {
                if(accessory.onSale === false){
                   return  accessory.price <= selectedPriceRange
                } else if(accessory.onSale === true){
                    return accessory.price - (accessory.price * (accessory.discountPercentage / 100)) <= selectedPriceRange
                }
            });
           
        }
       /*  if(selectedRating !== "Any Rating"){
            filteredItemsArray = filteredItemsArray.filter(accessory => accessory.rating === selectedRating);
           
        } */
        if(selectedRating.length > 0){
            filteredItemsArray = filteredItemsArray.filter(accessory => selectedRating.includes(Math.floor(accessory.ratingsAverage)));
        }
        if(isOnSale !== null){
            filteredItemsArray = filteredItemsArray.filter(accessory => accessory.onSale === isOnSale);
           
        }
        if(selectedSex !== "Any genre"){
            filteredItemsArray = filteredItemsArray.filter(accessory => accessory.gender === selectedSex);
           
        }

        setFilteredItems(filteredItemsArray);
        setFilteredVisibleItems(filteredItemsArray.slice(0, itemsPerPage));
        setFiltersAppliedToAccessories(true)

        applySorting(filteredItemsArray);
        
    }; 

    /* FILTERING BY SNEAKER BRAND  */

  

    const handleMultipleCategoryFilterOptionChange = (option) => {
        /* Check if filter is already applied and in the selectedBrand array */
        if(selectedCategory.includes(option)){
            /* If it is, remove it from the array */
            setSelectedCategory(selectedCategory.filter(category => category !== option))
        } else {
            /* If it is not, add it to the array */
            setSelectedCategory([...selectedCategory, option])
            setFiltersAppliedToAccessories(true)
        }
    }

    const removeCategoryFilter = () => {
        /* setSelectedBrand("All Brands") */
        setSelectedCategory([]);
    };

    const removeCategoryFromMultipleFilter = (option) => {
        setSelectedCategory(selectedCategory.filter(category => category !== option))
    }

    /* FILTER BY  RATING */
   

    const handleMultipleRatingFilterChange = (option) => {
        if(selectedRating.includes(option)){
            setSelectedRating(selectedRating.filter(rating => rating !== option))
        } else {
            setSelectedRating([...selectedRating, option])
            setFiltersAppliedToAccessories(true)
        }
    }

    const removeRatingFilter = () => {
        /* setSelectedRating("Any Rating") */
        setSelectedRating([]);
    }

    const removeMultipleRatingFilter = (option) => {
        setSelectedRating(selectedRating.filter(rating => rating !== option))
    }

    /* FILTER BY SALE  */

    const handleSaleFilterOptionChange = (option) => {
        setIsOnSale(option)
        if(option === null){
            setFiltersAppliedToAccessories(false)
        } else if(option !== null){
            setFiltersAppliedToAccessories(true)
        }
    }

    const removeSaleFilter = () => {
        setIsOnSale(null)
    }

    /* FILTER BY SEX */
    const handleSexFilterOptionChange = (option) => {
        setSelectedSex(option)
        if(option === "Any genre"){
            setFiltersAppliedToAccessories(false)
        } else if(option !== "Any genre"){
            setFiltersAppliedToAccessories(true)
        }
    }

    const removeSexFilter = () => {
        setSelectedSex("Any genre")
    }

    /* FILTER BY PRICE */

    const handlePriceFilterOptionChange = (option) => {
        setSelectedPriceRange(option)
        if(option === "All Prices"){
            setFiltersAppliedToAccessories(false)
        } else if (option !== "All Prices"){
            setFiltersAppliedToAccessories(true)
        }
    }

    const removePriceFilter = () => {
        setSelectedPriceRange("All Prices")
    }

    /* REMOVE ALL FILTERS AT ONCE */
    const removeAllFilters= () => {
        removeCategoryFilter();
        removeRatingFilter();
        removeSaleFilter();
        removeSexFilter();
        removePriceFilter();
    }

    /* NOTIFY THAT THERE ARE NO FILTERS*/
    const noFiltersApplied = () => {
        if(selectedCategory.length === 0 &&
        selectedRating.length === 0 &&
          isOnSale === null &&
          selectedSex === "Any genre" &&
            selectedPriceRange === "All Prices" &&
           filtersAppliedToAccessories !== null){
            setFiltersAppliedToAccessories(false)
        }
    };

     /* LOADING MORE SNEAKERS TO PAGE LOGIC */
     const handleLoadMore = (accessoriesList, isFiltered) => {
     
        /*  const nextPageIndex = filteredVisibleItems.length + itemsPerPage; */
         const nextPageIndex = isFiltered ? filteredVisibleItems.length + itemsPerPage :  visibleItems.length + itemsPerPage;
         const nextItems = isFiltered ?  filteredItems.slice(0, nextPageIndex) :   accessoriesList.slice(0, nextPageIndex);
         /* setSelectedSorting("Newest");
         setVisibleItems(nextItems); */
         if(isFiltered){
             setFilteredVisibleItems(nextItems)
         } else {
             setVisibleItems(nextItems)
         }
        
     }

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

    const CategoryFilterOptions = {
        label: "Category",
        options: [{label: "Backpack", value: "Backpack"}, {label: "Lunch-box", value: "Lunch-box"}, {label: "Wallet", value: "Wallet"}]
    }

    
    const saleFilterOptions = {
        label: "On Sale",
        options: [
          {label: "On Sale", value: true},
          {label: "Not on Sale", value: false}
        ]
      }
  
      const sexFilterOption ={
        label: "For",
        options: [
          {label: "Women", value:"Women"},
          {
            label:"Men", value:"Men"
          }
        ]
      }

      
      const ratingFilterOptions = {
          label: "Rating",
          options: [
            {
              label: <div className={styles.ratingContainer}>
              <StarRatingTag rating={5}/>
              </div>,
              value: 5
            },
            {
              label:  <div className={styles.ratingContainer}>
              <StarRatingTag rating={4}/>
              </div>,
              value: 4
            },
            {
              label: <div className={styles.ratingContainer}>
             <StarRatingTag rating={3}/>
              </div>,
              value:3
            },
            {
              label:<div className={styles.ratingContainer}>
              <StarRatingTag rating={2}/>
              </div>,
              value:2
            },
            {
              label: <div className={styles.ratingContainer}>
                <StarRatingTag rating={1}/>
                </div>,
                value:1
            }
          ],
          value:[5,4,3,2,1]
        }





    return (
        <AccessoresContext.Provider value={{
            isLoading,
            setIsLoading,
            visibleItems,
            setVisibleItems,
            filteredVisibleItems,
            filteredItems,
            removeAllFilters,
            noFiltersApplied,
            handleLoadMore,
            /* SORTING */
            selectOptions,
            selectedSorting,
            handleSortChange,
            applySorting,
            /* FILTERING */
            applyFiltering,
            filtersAppliedToAccessories,
            /* FILTERING BY CATEGORY */
            CategoryFilterOptions,
            selectedCategory,
            handleMultipleCategoryFilterOptionChange,
            removeCategoryFilter,
            removeCategoryFromMultipleFilter,
            /* FILTERING BY RATING */
            ratingFilterOptions,
            selectedRating,
            handleMultipleRatingFilterChange,
            removeRatingFilter,
            removeMultipleRatingFilter,
            /* FILTERING BY SALE */
            saleFilterOptions,
            isOnSale,
            handleSaleFilterOptionChange,
            removeSaleFilter,
            /* FILTERING BY GENRE */
            sexFilterOption,
            selectedSex,
            handleSexFilterOptionChange,
            removeSexFilter,
            /* FILTERING BY PRICE */
            selectedPriceRange,
            handlePriceFilterOptionChange,
            removePriceFilter,
        }}>
            {children}
        </AccessoresContext.Provider>    
    )
}