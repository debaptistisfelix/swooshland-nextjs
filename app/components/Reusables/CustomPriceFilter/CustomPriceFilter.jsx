import styles from './CustomPriceFilter.module.css'
import { poppins } from '@app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { useContext } from 'react';
import { SneakersContext } from '@app/context/SneakersPageContext';

export default function CustomPriceFilter({selectedPriceRange,  handleFilterOptionChange, position}) {
    const [inputValue, setInputValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(selectRef.current && !selectRef.current.contains(e.target)){
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    useEffect(()=>{
        if(selectedPriceRange === "All Prices"){
            setInputValue("")
        }
    }, [selectedPriceRange])

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const closeSelect = () => {
        setIsOpen(false)
    }
  return (
    <main ref={selectRef} className={`${styles.section} ${poppins.className}`}>
         <div onClick={toggleOpen} className={`${styles.customSelect} ${isOpen === true && styles.active}`}>
            <h2 className={styles.selectTitle}>Price</h2>
            <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
        </div>
        {isOpen &&  <section className={`${styles.optionsBox}  ${ position === "bottom" ? styles.bottomOptionsPosition : styles.rightOptionsPosition}`}>
      
            <label className={styles.priceLabel}>Max price:</label>
            <input onChange={handleInputChange} value={inputValue}  className={styles.priceInput} type="number"/>
            <button onClick={()=>{
                handleFilterOptionChange(inputValue)
                closeSelect();
            }} className={styles.priceBtn}>

            <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
            </button>
        </section>}
    </main>
  )
}
