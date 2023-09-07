"use client"

import styles from './ReviewItemCard.module.css'
import Image from 'next/image'
import { poppins } from '@app/fonts'





export default function ReviewItemCard({item}) {
const {name, price, images, model, gender} = item;


  
  return (
    <main className={`${styles.card} ${poppins.className}`}>
        <section className={styles.imgBox}>
            <Image className={styles.img} src={`/${images[0]}`} alt="jordan-1" fill={true} />
        </section>
        <section className={styles.textBox}>
            <h1 className={styles.title}>{model}</h1>
            <h2 className={styles.name}>{name}</h2>
            <h3 className={styles.sectionTag}>{gender === "Men" ? "(MNS)" : "(WMNS)"}</h3>
           
        </section>
    </main>
  )
}
