"use client"

import styles from './CustomSelect.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { poppins } from '@app/fonts';

export default function CustomSelect({selectOptions, selectedOption, handleOptionChange, position}) {
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
       <h2 className={styles.selectTitle}>{selectedOption}</h2>
       <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
        </div>
       {isOpen &&  <section className={`${styles.optionsBox}  ${ position === "bottom" ? styles.bottomOptionsPosition : styles.rightOptionsPosition}`}>
    {selectOptions.options.map(option =>{
        return <div key={uuidv4()} className={`${styles.selectOptionBox} ${selectedOption === option && styles.active}`}>
            <p
            onClick={()=>{handleOptionChange(option); closeSelect()}}
            className={`${styles.option} ${selectedOption === option && styles.active}`}>{option}</p>
        </div>
    })}
        </section>}
   </main>
  )
}


