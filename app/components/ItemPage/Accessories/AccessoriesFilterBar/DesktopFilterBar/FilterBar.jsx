"use client"
import styles from './FilterBar.module.css'
import CustomSelect from '@app/components/Reusables/CustomSelect/CustomSelect'
import CustomFilterSelect from '@app/components/Reusables/CustomFilterSelect/CustomFilterSelect'
import { useContext } from 'react'
import { AccessoresContext } from '@app/context/AccessoriesContext'
import CustomPriceFilter from '@app/components/Reusables/CustomPriceFilter/CustomPriceFilter'
import { v4 as uuidv4 } from 'uuid';
import FilterTag from '@app/components/ItemPage/Sneakers/SneakerFilterBar/FilterTag/FilterTag'

export default function FilterBar() {
    const {
        selectedCategory,
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
      filtersAppliedToAccessories,
      selectOptions,
      CategoryFilterOptions,
      saleFilterOptions,
      sexFilterOption,
      ratingFilterOptions,
      handleMultipleCategoryFilterOptionChange,
    removeCategoryFromMultipleFilter,
      handleMultipleRatingFilterChange,
      removeMultipleRatingFilter
    } = useContext(AccessoresContext)
  return (
    <main className={styles.bar}>
        <section className={`${styles.filterOptionsBox} ${filtersAppliedToAccessories !== true && styles.active}`}>
            <h3 className={styles.label}>
                Filter by:
            </h3>
            <div className={styles.filterList}>
              <div className={styles.categoryFilterContainer}>
                {/* CATEGORYFILTER CUSTOM SELECT */}
              <CustomFilterSelect position="right" filterOptions={CategoryFilterOptions} handleFilterOptionChange={handleMultipleCategoryFilterOptionChange} /* handleFilterOptionChange={handleBrandFilterOptionChage} *//>
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
              <CustomPriceFilter position="rigth" handleFilterOptionChange={handlePriceFilterOptionChange}  />
              </div>
            </div>
        </section>
        <section className={`${styles.sortOptionsBox} ${filtersAppliedToAccessories !== true && styles.active}`}>
        <h3 className={styles.label}>
                Sort by:
            </h3>
            <div className={styles.sortSelectorBox}>
              <CustomSelect position="bottom" selectOptions={selectOptions} handleOptionChange={handleSortChange} selectedOption={selectedSorting} />
            </div>
            
        </section>
        <section  className={`${styles.selectedFilterBox} ${filtersAppliedToAccessories === true && styles.openChosenFilterBox} ${filtersAppliedToAccessories === false && styles.closeChosenFilterBox} `}>
         <h3 onClick={removeAllFilters} className={styles.removeAllFilters}>Remove All</h3>
        {selectedCategory.length > 0 && selectedCategory.map((category)=>{
            return <FilterTag key={uuidv4()} removeFilterOption={removeCategoryFromMultipleFilter} filterOption={category}/>
        })}
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
