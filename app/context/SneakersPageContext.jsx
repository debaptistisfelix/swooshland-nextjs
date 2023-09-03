"use client"

import { createContext, useState } from "react"
import StarRatingTag from "@app/components/ItemPage/Sneakers/SneakerFilterBar/StarRatingTag/StarRatingTag";
import styles from "@app/components/ItemPage/Sneakers/SneakerFilterBar/DesktopFilterBar/FilterBar.module.css";

export const SneakersContext = createContext();

export default function SneakersContextProvider({children}) {
    const [isLoading, setIsLoading] = useState(true);
    /* Sorting state */
    const [selectedSorting, setSelectedSorting] = useState("Newest");
    /* Filtering states */
    const [filtersAppliedToSneakers, setFiltersAppliedToSneakers] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filteredVisibleItems, setFilteredVisibleItems] = useState([]);
    /* Single Filtering per type state */
   /*  const [selectedBrand, setSelectedBrand] = useState("Any Brand"); */
   const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
   /*  const [selectedRating, setSelectedRating] = useState("Any Rating"); */
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
        filtersAppliedToSneakers ? setFilteredVisibleItems(slicedItems) : setVisibleItems(slicedItems) ;
       
       
       
       
    }

    /* FILTERING LOGIC */

    const applyFiltering = (listToFilter) => {
    
        let filteredItemsArray = [...listToFilter]
        

      
        if(selectedBrand.length > 0) {
            filteredItemsArray = filteredItemsArray.filter(sneaker => selectedBrand.includes(sneaker.brand));
        }
        if(selectedPriceRange !== "All Prices"){
            filteredItemsArray = filteredItemsArray.filter(sneaker => {
                if(sneaker.onSale === false){
                    return sneaker.price <= selectedPriceRange
                   
                } else if(sneaker.onSale === true){
                   return sneaker.price - (sneaker.price * (sneaker.discountPercentage / 100)) <= selectedPriceRange
                   
                }
            });
           
        }
      
        if(selectedRating.length > 0){
            filteredItemsArray = filteredItemsArray.filter(sneaker => selectedRating.includes(Math.floor(sneaker.ratingsAverage)));
        }
        if(isOnSale !== null){
            filteredItemsArray = filteredItemsArray.filter(sneaker => sneaker.onSale === isOnSale);
            
           
        }
        if(selectedSex !== "Any genre"){
            filteredItemsArray = filteredItemsArray.filter(sneaker => sneaker.gender === selectedSex);
           
        }

      
        setFilteredItems(filteredItemsArray);
        setFilteredVisibleItems(filteredItemsArray.slice(0, itemsPerPage));
        setFiltersAppliedToSneakers(true)

        applySorting(filteredItemsArray);
        
    }; 

 

    /* FILTERING BY SNEAKER BRAND  */

    const handleBrandFilterOptionChage = (option) => {
        setSelectedBrand(option)
        if(option === "All Brands"){
            setFiltersAppliedToSneakers(false)
        } else if(option !== "All Brands"){
            setFiltersAppliedToSneakers(true)
        }

    }

    const handleMultipleBrandFilterOptionChange = (option) => {
        /* Check if filter is already applied and in the selectedBrand array */
        if(selectedBrand.includes(option)){
            /* If it is, remove it from the array */
            setSelectedBrand(selectedBrand.filter(brand => brand !== option))
        } else {
            /* If it is not, add it to the array */
            setSelectedBrand([...selectedBrand, option])
            setFiltersAppliedToSneakers(true)
        }
    }

    const removeBrandFilter = () => {
        /* setSelectedBrand("All Brands") */
        setSelectedBrand([]);
    };

    const removeBrandFromMultipleBrandFilter = (option) => {
        setSelectedBrand(selectedBrand.filter(brand => brand !== option))
    }

    /* FILTER BY SNEAKER RATING */
    const handleRatingFilterOptionChange = (option) => {
        setSelectedRating(option)
        if(option === "All Brands"){
            setFiltersAppliedToSneakers(false)
        } else if(option !== "All Brands"){
            setFiltersAppliedToSneakers(true)
        }
    }

    const handleMultipleRatingFilterChange = (option) => {
        if(selectedRating.includes(option)){
            setSelectedRating(selectedRating.filter(rating => rating !== option))
        } else {
            setSelectedRating([...selectedRating, option])
            setFiltersAppliedToSneakers(true)
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
            setFiltersAppliedToSneakers(false)
        } else if(option !== null){
            setFiltersAppliedToSneakers(true)
        }
    }

    const removeSaleFilter = () => {
        setIsOnSale(null)
    }

    /* FILTER BY SEX */
    const handleSexFilterOptionChange = (option) => {
        setSelectedSex(option)
        if(option === "Any genre"){
            setFiltersAppliedToSneakers(false)
        } else if(option !== "Any genre"){
            setFiltersAppliedToSneakers(true)
        }
    }

    const removeSexFilter = () => {
        setSelectedSex("Any genre")
    }

    /* FILTER BY PRICE */

    const handlePriceFilterOptionChange = (option) => {
        setSelectedPriceRange(option)
        if(option === "All Prices"){
            setFiltersAppliedToSneakers(false)
        } else if (option !== "All Prices"){
            setFiltersAppliedToSneakers(true)
        }
    }

    const removePriceFilter = () => {
        setSelectedPriceRange("All Prices")
    }

    /* REMOVE ALL FILTERS AT ONCE */
    const removeAllFilters= () => {
        removeBrandFilter();
        removeRatingFilter();
        removeSaleFilter();
        removeSexFilter();
        removePriceFilter();
    }

    /* NOTIFY THAT THERE ARE NO FILTERS*/
    const noFiltersApplied = () => {
        if(selectedBrand.length === 0 &&
        selectedRating.length === 0 &&
          isOnSale === null &&
          selectedSex === "Any genre" &&
            selectedPriceRange === "All Prices" &&
           filtersAppliedToSneakers !== null){
            setFiltersAppliedToSneakers(false)
        }
    };

   


    /* LOADING MORE SNEAKERS TO PAGE LOGIC */
    const handleLoadMore = (sneakerList, isFiltered) => {
     
       /*  const nextPageIndex = filteredVisibleItems.length + itemsPerPage; */
        const nextPageIndex = isFiltered ? filteredVisibleItems.length + itemsPerPage :  visibleItems.length + itemsPerPage;
        const nextItems = isFiltered ?  filteredItems.slice(0, nextPageIndex) :   sneakerList.slice(0, nextPageIndex);
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
        const brandFilterOptions = {
        label: "Brand",
        options: [{label: "Adidas", value: "Adidas"}, {label: "Fila", value: "Fila"}, {label: "Jordan", value: "Jordan"}, {label: "Nike", value: "Nike"}, {label: "Puma", value: "Puma"}]
      
      
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
        <SneakersContext.Provider value={{
            /* Sorting */
        applySorting,
        handleSortChange,
        selectedSorting,
        /* Filtering */
        applyFiltering,
        /* Brand Filtering */
        handleBrandFilterOptionChage,
        removeBrandFilter,
        selectedBrand,
        handleMultipleBrandFilterOptionChange,
        removeBrandFromMultipleBrandFilter,
        /* Rating Filtering */
        handleMultipleRatingFilterChange,
        removeMultipleRatingFilter,
        selectedRating,
        handleRatingFilterOptionChange,
        removeRatingFilter,
        /* Price Filtering */
        selectedPriceRange,
        handlePriceFilterOptionChange,
        removePriceFilter,
        /* On sale Filtering */
        handleSaleFilterOptionChange,
        removeSaleFilter,
        isOnSale,    
        /* Sex filtering */
        selectedSex,
        removeSexFilter,
        handleSexFilterOptionChange,
        removeAllFilters,
        noFiltersApplied,
        filtersAppliedToSneakers,
        filteredItems,
        filteredVisibleItems,
        handleLoadMore,
        visibleItems,
        setVisibleItems,
        itemsPerPage,
        isLoading,
        setIsLoading,
        selectOptions,
        brandFilterOptions,
        saleFilterOptions,
        sexFilterOption,
        ratingFilterOptions
          }}>
            {children}
        </SneakersContext.Provider>
    )
};
