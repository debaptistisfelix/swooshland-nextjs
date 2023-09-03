import styles from './MobileFilterTagsContainer.module.css'
import { useContext } from 'react'
import { SneakersContext } from '@app/context/SneakersPageContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';

export default function MobileFilterTagsContainer() {
    const {selectedBrand, removeBrandFilter,  removeBrandFromMultipleBrandFilter, selectedRating, removeRatingFilter, isOnSale, removeSaleFilter, removeMultipleRatingFilter,
        selectedSex, removeSexFilter, selectedPriceRange, removePriceFilter, filtersAppliedToSneakers, removeAllFilters
    } = useContext(SneakersContext)
  return (
   <>
    <section className={ `${styles.section}
    ${filtersAppliedToSneakers === true && styles.openChosenFilterBox } ${filtersAppliedToSneakers === false && styles.closeChosenFilterBox}
     `}>
    <button onClick={removeAllFilters} className={styles.removeAllBtn}>Remove All</button>
    {selectedBrand.length !== 0 && selectedBrand.map(brand =>{
        return  <div key={uuidv4()} className={styles.tagBox}>
        <h1 className={styles.tagTitle}>
            {brand}
        </h1>
        <FontAwesomeIcon onClick={()=>{ removeBrandFromMultipleBrandFilter(brand)}} icon={faX} className={styles.icon}/>
        </div>
    })}
    {selectedRating.length !== 0 && selectedRating.map(rating =>{
        return <div key={uuidv4()} className={styles.tagBox}>
        <h1 className={styles.tagTitle}>
                {rating} 
                <FontAwesomeIcon icon={faStar} className={styles.starIcon}/>
            </h1>
            <FontAwesomeIcon onClick={()=>{removeMultipleRatingFilter(rating)}} icon={faX} className={styles.icon}/>
            </div>
    })}
    {isOnSale !== null && <div className={styles.tagBox}>
    <h1 className={styles.tagTitle}>
            {isOnSale === true && "On Sale" }
            {isOnSale === false && "Not on Sale" }
        </h1>
        <FontAwesomeIcon onClick={removeSaleFilter} icon={faX} className={styles.icon}/>
        </div>}
    {selectedSex !== "Any genre" && <div className={styles.tagBox}>
    <h1 className={styles.tagTitle}>
            {selectedSex}
        </h1>
        <FontAwesomeIcon onClick={removeSexFilter} icon={faX} className={styles.icon}/>
        </div>}
    {selectedPriceRange !== "All Prices" && <div className={styles.tagBox}>
    <h1 className={styles.tagTitle}>
            Max ${selectedPriceRange}
        </h1>
        <FontAwesomeIcon onClick={removePriceFilter} icon={faX} className={styles.icon}/>
        </div>}
    </section>
   </>
  )
}
