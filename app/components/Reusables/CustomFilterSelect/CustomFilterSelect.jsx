import styles from './CustomFilterSelect.module.css'
import { poppins } from '@app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';

export default function CustomFilterSelect({ filterOptions, selectedFilter, handleFilterOptionChange, position}) {
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

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const closeSelect = () => {
        setIsOpen(false)
    }

  return (
    <main ref={selectRef} className={`${styles.section} ${poppins.className}`}>
        <div onClick={toggleOpen} className={`${styles.customSelect} ${isOpen === true && styles.active}`}>
            <h2 className={styles.selectTitle}>{filterOptions.label}</h2>
            <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
        </div>
        {isOpen &&  <section className={`${styles.optionsBox}  ${ position === "bottom" ? styles.bottomOptionsPosition : styles.rightOptionsPosition}`}>
        {filterOptions.options.map(option =>{
        return <div key={uuidv4()} className={`${styles.selectOptionBox} ${selectedFilter === option && styles.active}`}>
        <p
        onClick={()=>{handleFilterOptionChange(option); closeSelect()}}
        className={`${styles.option} ${selectedFilter === option && styles.active}`}>{option}</p>
        </div>
        })}
        </section>}
    </main>
        )
    }
