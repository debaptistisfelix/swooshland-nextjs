import { faX } from '@fortawesome/free-solid-svg-icons'
import styles from './FilterTag.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';




export default function FilterTag({filterOption, removeFilterOption, filterType}) {
  
  const createStarIconsBasedOnRating = (option) => {
    if(Number.isInteger(option)){
      let starIcons = []
      for(let i = 0; i < option; i++){
        starIcons.push(<FontAwesomeIcon key={uuidv4()} icon={faStar} className={styles.ratingIcon}/>)
      }
      return starIcons
    }
  }



  return (
    <main className={styles.tag}>
        <h1 className={styles.filterName}>
        {filterType === "price" && "max $"} 
        {!Number.isInteger(filterOption) && filterOption}
        {Number.isInteger(filterOption) && createStarIconsBasedOnRating(filterOption)}
        {filterOption === true && "On Sale"  }
        {filterOption === false && "Not on Sale"  }
        </h1>
        <FontAwesomeIcon onClick={()=>{
          removeFilterOption(filterOption)
        }} icon={faX} className={styles.icon}/>
    </main>
  )
}
