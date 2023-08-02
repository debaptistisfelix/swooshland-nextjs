"use client"

import styles from './SizeTableContainer.module.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function SizeTableContainer() {
    const [sizeFormat, setSizeFormat] = useState("EU")

    const changeFromat = (e) => {
        setSizeFormat(e.target.innerText)
    };

    const sizes = [
        36, 37, 38, 39, 40,   41,  42,  43, 44,  45
    ]
  return (
    <main className={styles.card}>
        <section className={styles.optionBox}>
            <h2 onClick={changeFromat} className={`${styles.format} ${sizeFormat === "EU" && styles.active}`}>EU</h2>
            <h2 onClick={changeFromat} className={`${styles.format} ${sizeFormat === "US" && styles.active}`}>US</h2>
            <h2 onClick={changeFromat} className={`${styles.format} ${sizeFormat === "UK" && styles.active}`}>UK</h2>
          <p className={styles.sexCateg}>(Men's sizes)</p>
        </section>

        <section className={styles.sizeTable}>
            {sizes.map((size, i) =>{
                return <div className={styles.sizeBlock} key={uuidv4()}>
                    {sizeFormat === "EU" && size}
                    {sizeFormat === "US" && (size - 33)}
                    {sizeFormat === "UK" && (size - 33)}
                </div>
            })}
        </section>
    </main>
  )
}
