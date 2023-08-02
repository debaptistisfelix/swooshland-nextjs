"use client"

import styles from './ReviewItemCard.module.css'
import Image from 'next/image'
import { poppins } from '@app/fonts'




export default function ReviewItemCard() {
  
  return (
    <main className={`${styles.card} ${poppins.className}`}>
        <section className={styles.imgBox}>
            <Image className={styles.img} src="/lust1.jpg" alt="jordan-1" fill={true} />
        </section>
        <section className={styles.textBox}>
            <h1 className={styles.title}>Jordan 1 Mid </h1>
            <h2 className={styles.name}>Rogue - Sin of Lust</h2>
            <h3 className={styles.sectionTag}>(WMNS)</h3>
            <h1 className={styles.price}>$289.90</h1>
        </section>
    </main>
  )
}
