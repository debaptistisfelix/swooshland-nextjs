"use client"

import styles from './FilterBar.module.css'
import CustomSelect from '@app/components/Reusables/CustomSelect/CustomSelect'
import CustomFilterSelect from '@app/components/Reusables/CustomFilterSelect/CustomFilterSelect'
import FilterTag from '../FilterTag/FilterTag'
import { useContext } from 'react'
import { SneakersContext } from '@app/context/SneakersPageContext'
import CustomPriceFilter from '@app/components/Reusables/CustomPriceFilter/CustomPriceFilter'
import { v4 as uuidv4 } from 'uuid';

export default function FilterBar() {
 
  
  const {
     selectedBrand,
     selectedSorting,
      handleSortChange,
      selectedRating,
      handleSaleFilterOptionChange,
      removeSaleFilter,
      isOnSale,
      selectedSex,
      removeSexFilter,
      handleSexFilterOptionChange,
      selectedPriceRange,
      handlePriceFilterOptionChange,
      removePriceFilter,
      removeAllFilters,
      filtersAppliedToSneakers,
      selectOptions,
      brandFilterOptions,
      saleFilterOptions,
      sexFilterOption,
      ratingFilterOptions,
      handleMultipleBrandFilterOptionChange,
      removeBrandFromMultipleBrandFilter,
      handleMultipleRatingFilterChange,
      removeMultipleRatingFilter
    } = useContext(SneakersContext)

  
  
  return (
    <main className={styles.bar}>
        <section className={`${styles.filterOptionsBox} ${filtersAppliedToSneakers !== true && styles.active}`}>
            <h3 className={styles.label}>
                Filter by:
            </h3>
            <div className={styles.filterList}>
              <div className={styles.brandFilterContainer}>
                {/* BRAND FILTER CUSTOM SELECT */}
              <CustomFilterSelect position="right" filterOptions={brandFilterOptions} handleFilterOptionChange={handleMultipleBrandFilterOptionChange} /* handleFilterOptionChange={handleBrandFilterOptionChage} *//>
              </div>
              <div className={styles.ratingFilterContainer}>
                {/* Rating FILTER CUSTOM SELECT */}
              <CustomFilterSelect position="right" filterOptions={ratingFilterOptions} /* handleFilterOptionChange={handleRatingFilterOptionChange}  */handleFilterOptionChange={handleMultipleRatingFilterChange}/>
              </div>
              <div className={styles.saleFilterContainer}>
                {/* sale FILTER CUSTOM SELECT */}
              <CustomFilterSelect position="right" filterOptions={saleFilterOptions} handleFilterOptionChange={handleSaleFilterOptionChange}/>
              </div>
              <div className={styles.saleFilterContainer}>
                {/* SEX FILTER CUSTOM SELECT */}
              <CustomFilterSelect position="right" filterOptions={sexFilterOption} handleFilterOptionChange={handleSexFilterOptionChange}/>
              </div>
              <div className={styles.priceFilterContainer}>
                {/* Price FILTER CUSTOM SELECT */}
              <CustomPriceFilter selectedPriceRange={selectedPriceRange} position="rigth" handleFilterOptionChange={handlePriceFilterOptionChange}  />
              </div>
            </div>
        </section>
        <section className={`${styles.sortOptionsBox} ${filtersAppliedToSneakers !== true && styles.active}`}>
        <h3 className={styles.label}>
                Sort by:
            </h3>
            <div className={styles.sortSelectorBox}>
              <CustomSelect position="bottom" selectOptions={selectOptions} handleOptionChange={handleSortChange} selectedOption={selectedSorting} />
            </div>
            
        </section>
        <section  className={`${styles.selectedFilterBox} ${filtersAppliedToSneakers === true && styles.openChosenFilterBox} ${filtersAppliedToSneakers === false && styles.closeChosenFilterBox} `}>
         <h3 onClick={removeAllFilters} className={styles.removeAllFilters}>Remove All</h3>
        {/* {selectedBrand !== "All Brands" && <FilterTag removeFilterOption={removeBrandFilter} filterOption={selectedBrand}/> } */}
        {selectedBrand.length > 0 && selectedBrand.map((brand)=>{
            return <FilterTag key={uuidv4()} removeFilterOption={removeBrandFromMultipleBrandFilter} filterOption={brand}/>
        })}
          {/* {selectedRating !== "Any Rating" && <FilterTag removeFilterOption={removeRatingFilter} filterOption={selectedRating}/>} */}
          {selectedRating.length > 0 && selectedRating.map(rating =>{
            return <FilterTag key={uuidv4()} removeFilterOption={removeMultipleRatingFilter} filterOption={rating}/>
          })}
          {isOnSale !== null && <FilterTag removeFilterOption={removeSaleFilter} filterOption={isOnSale} />}
          {selectedSex !== "Any genre" && <FilterTag removeFilterOption={removeSexFilter} filterOption={selectedSex} />}
          {selectedPriceRange !== "All Prices" && <FilterTag filterType="price" filterOption={selectedPriceRange} removeFilterOption={removePriceFilter} />}
        </section>
    </main>
  )
}
