import styles from './MobileFilterPage.module.css'
import { poppins } from '@app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { SneakersContext } from '@app/context/SneakersPageContext'

export default function MobileFilterPage({mobileFiltersOpen, toggleMobileFilters}) {
  const {
    /* Options for the selects */
    selectOptions,
    brandFilterOptions,
    ratingFilterOptions,
    saleFilterOptions,
    sexFilterOption,
    /* Sorting  */
    selectedSorting,
    handleSortChange,
     /* Brand Filtering */ 

    selectedBrand,
    /* Rating Filtering */
    selectedRating,
  
    /* Sale Filtering */
    handleSaleFilterOptionChange,
    removeSaleFilter,
    isOnSale, 
    /* Genre Filtering */
    selectedSex,
    removeSexFilter,
    handleSexFilterOptionChange,
    /* Price Filtering */
    selectedPriceRange,
    handlePriceFilterOptionChange,
    handleMultipleBrandFilterOptionChange,
    removeBrandFromMultipleBrandFilter,
    handleMultipleRatingFilterChange,
    removeMultipleRatingFilter,
      } = useContext(SneakersContext);

    const [inputValue, setInputValue] = useState("") 

    useEffect(()=>{
      if(selectedPriceRange === "All Prices"){
          setInputValue("")
      }
  }, [selectedPriceRange])
      

  return (
   <main className={`${styles.page} ${poppins.className} ${mobileFiltersOpen === true && styles.active}
   ${mobileFiltersOpen === false && styles.notActive}
   `}>
     <section className={styles.container}>
        <span onClick={toggleMobileFilters}  className="smallNavBackBtnBox">
            <FontAwesomeIcon icon={faArrowLeft} className="smallNavLeftArrowIcon" />
            <span className="smallNavBackBtn">Back to Sneakers</span>
        </span>
       
        
      </section>

      <section className={styles.sortingContainer}>
        <h1 className={styles.label}>Sort by:</h1>
        <div className={styles.sortingOptionsList}>
            {selectOptions.options.map((option)=>{
                return <h1 onClick={()=>{
                  handleSortChange(option)
                }} key={uuidv4()} className={`${styles.option} ${selectedSorting === option && styles.active}`}>{option}</h1>
            })}
        </div>
      </section>

      <section className={styles.filteringContainer}>
      <h1 className={styles.label}>Filter by Brand:</h1>
      <div className={styles.sortingOptionsList}>
            {brandFilterOptions.options.map((option)=>{
                return <h1 onClick={()=>{
                  if(selectedBrand.length === 0){
                    /* handleBrandFilterOptionChage(option.label) */
                    handleMultipleBrandFilterOptionChange(option.label)
                  } else if(selectedBrand.includes(option.label)){
                    removeBrandFromMultipleBrandFilter(option.label);
                  } else {
                    /* handleBrandFilterOptionChage(option.label) */
                    handleMultipleBrandFilterOptionChange(option.label)
                  }
                }} key={uuidv4()} className={`${styles.option} ${selectedBrand.includes(option.label) && styles.active}`}>{option.label}</h1>
            })}
        </div>
      </section>
      <section className={styles.filteringContainer}>
      <h1 className={styles.label}>Filter by Rating:</h1>
      <div className={styles.sortingOptionsList}>
            {ratingFilterOptions.options.map((option)=>{
                return <h1 onClick={()=>{
                  if(selectedRating.length === 0){
                    /* handleRatingFilterOptionChange(option.value) */
                    handleMultipleRatingFilterChange(option.value)
                  } else if(selectedRating.includes(option.value)){
                    removeMultipleRatingFilter(option.value)
                  } else {
                   /*  handleRatingFilterOptionChange(option.value) */
                   handleMultipleRatingFilterChange(option.value)
                  }
                }} key={uuidv4()} className={`${styles.option} ${selectedRating.includes(option.value) && styles.active}`}>{option.label}</h1>
            })}
        </div>
      </section>
      <section className={styles.filteringContainer}>
      <h1 className={styles.label}>Filter by Discount:</h1>
      <div className={styles.sortingOptionsList}>
            {saleFilterOptions.options.map((option)=>{
                return <h1 onClick={()=>{
                  if(isOnSale === null){
                    handleSaleFilterOptionChange(option.value)
                  } else if(isOnSale === option.value){
                    removeSaleFilter()
                  } else {
                    handleSaleFilterOptionChange(option.value)
                  }
                }} key={uuidv4()} className={`${styles.option} ${isOnSale === option.value && styles.active}`} >{option.label}</h1>
            })}
        </div>
      </section>
      <section className={styles.filteringContainer}>
      <h1 className={styles.label}>Filter by Genre:</h1>
      <div className={styles.sortingOptionsList}>
            {sexFilterOption.options.map((option)=>{
                return <h1 onClick={()=>{
                  if(selectedSex === "Any genre"){
                    handleSexFilterOptionChange(option.label)
                  } else if(selectedSex === option.label){
                    removeSexFilter()
                  } else {
                    handleSexFilterOptionChange(option.label)
                  }
                }} key={uuidv4()} className={`${styles.option} ${selectedSex === option.label && styles.active}`}>{option.label}</h1>
            })}
        </div>
      </section>
      <section className={styles.filteringContainer}>
      <h1 className={styles.label}>Filter by Price:</h1>
      <div className={styles.priceInputContainer}>
           <h1 className={styles.priceLabel}>Max $</h1>
           <input
           value={inputValue}
           onChange={()=>{
            setInputValue(event.target.value)
           }} type="number" className={styles.priceInput}  />
           <button
           onClick={()=>{
            handlePriceFilterOptionChange(inputValue)
           }}
           className={styles.priceBtn}>
            <FontAwesomeIcon icon={faCheck} className={styles.priceIcon} />
           </button>
        </div>
      </section>
   </main>
  )
}
