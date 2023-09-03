"use client"

import styles from './SizeTableContainer.module.css'
import { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { CartContext } from '@app/context/CartContext';
import { poppins } from '@app/fonts';

export default function SizeTableContainer({item}) {
    const [sizeFormat, setSizeFormat] = useState("EU")
    const {availableSizes, gender} = item;
    const {chosenSize, setChosenSize} = useContext(CartContext);
 console.log(item)

    const changeFromat = (e) => {
        setSizeFormat(e.target.innerText)
    };

  return (
    <main className={`${styles.card} ${poppins.className}`}>
        {availableSizes.length > 1 && <section className={styles.optionBox}>
            <h2 onClick={changeFromat} className={`${styles.format} ${sizeFormat === "EU" && styles.active}`}>EU</h2>
            <h2 onClick={changeFromat} className={`${styles.format} ${sizeFormat === "US" && styles.active}`}>US</h2>
            <h2 onClick={changeFromat} className={`${styles.format} ${sizeFormat === "UK" && styles.active}`}>UK</h2>
          <p className={styles.sexCateg}>({gender === "Men" ? "Men" : "Women"}'s sizes)</p>
        </section>}
        {availableSizes.length === 1 && <section className={styles.optionBox}>
          <h2 className={styles.onlySizeFormat}>This item has only one size option.</h2>
          </section>}

        <section className={styles.sizeTable}>
            {availableSizes.length > 1 && availableSizes.map((size, i) =>{
                return <button onClick={()=>{
                  if(chosenSize === size){
                    setChosenSize(null);
                  } else {
                    setChosenSize(size);
                  }
                }} className={`${styles.sizeBlock} ${poppins.className} ${chosenSize === size && styles.active} ${size.availability === 0 && styles.unavailable}`}
                disabled={size.availability === 0}
                key={uuidv4()}>
                    {sizeFormat === "EU" && size.EUsize}
                    {sizeFormat === "US" && item.gender === "Men" &&  (size.EUsize - 30)}
                    {sizeFormat === "US" && item.gender === "Women" &&  (size.EUsize - 31)}
                    {sizeFormat === "UK" && item.gender === "Men" &&  (size.EUsize - 33)}
                    {sizeFormat === "UK" && item.gender === "Women" &&  (size.EUsize - 34)}
                </button>
            })}
            {availableSizes.length === 1 && <button
            onClick={()=>{
              if(chosenSize === availableSizes[0]){
                setChosenSize(null);
              } else {
                setChosenSize(availableSizes[0]);
              }
            }} 
            disabled={availableSizes[0].availability === 0} className={`${styles.sizeBlock} ${poppins.className} ${chosenSize === availableSizes[0] && styles.active} ${availableSizes[0].availability === 0 && styles.unavailable}`}>OS</button>}
        </section>
    </main>
  )
}
