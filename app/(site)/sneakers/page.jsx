

import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import SneakerListing from '@app/components/ItemPage/Sneakers/SneakersListing/SneakerListing'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import SneakersContextProvider from '@app/context/SneakersPageContext'

export default function SneakersPage() {
  const sneakers = [
    {
      model: "Nike air force 1",
      name: "Dragon V1",
      brand: "Nike",
      price: 189.90,
      date: "2023-01-15",
      rating: 5,
      onSale: false
    },
    {
      model: "Nike air force 1",
      name: "L.A. Kraken",
      brand: "Nike",
      price: 189.90,
      date: "2023-02-28",
      rating: 4,
      onSale: false
    },
    {
      model: "Nike air force 1",
      name: "Kraken 1994",
      brand: "Nike",
      price: 189.90,
      date: "2023-03-10",
      rating: 4,
      onSale: false
    },
    {
      model: "Nike air force 1",
      name: "Dragon V2",
      brand: "Nike",
      price: 189.90,
      date: "2023-04-05",
      rating: 3,
      onSale: false
    },
    {
      model: "Nike air force 1",
      name: "Doodles",
      brand: "Nike",
      price: 189.90,
      date: "2023-05-20",
      rating: 4,
      onSale: false
    },
    {
      model: "Nike air force 1",
      name: "Leopard",
      brand: "Nike",
      price: 189.90,
      date: "2023-06-08",
      rating: 5,
      onSale: false
    },
    {
      model: "Nike air force 1",
      name: "Leo Kawai",
      brand: "Nike",
      price: 189.90,
      date: "2023-07-16",
      rating: 3,
      onSale: false
    },
    {
      model: "Nike air force 1",
      name: "Blue Sky",
      brand: "Nike",
      price: 189.90,
      date: "2023-08-22",
      rating: 5,
      onSale: false
    },
    {
      model: "Jordan 1 Mid",
      name: "Sunday",
      brand: "Jordan",
      price: 289.90,
      date: "2023-01-15",
      rating: 4,
      onSale: true
    },
    {
      model: "Jordan 1 Mid",
      name: "Sin of Lust",
      brand: "Jordan",
      price: 289.90,
      date: "2023-02-28",
      rating: 4,
      onSale: false
    },
    {
      model: "Jordan 1 Mid",
      name: "Sin of Rage",
      brand: "Jordan",
      price: 289.90,
      date: "2023-03-10",
      rating: 5,
      onSale: false
    },
    {
      model: "Jordan 1 Mid",
      name: "Sin of Pride",
      brand: "Jordan",
      price: 289.90,
      date: "2023-04-05",
      rating: 4,
      onSale: true
    },
    {
      model: "Jordan 1 Mid",
      name: "Dior",
      brand: "Jordan",
      price: 289.90,
      date: "2023-05-20",
      rating: 5,
      onSale: true
    },
    {
      model: "Jordan 1 Mid",
      name: "OG Orange",
      brand: "Jordan",
      price: 289.90,
      date: "2023-06-08",
      rating: 4,
      onSale: false
    },
    {
      model: "Jordan 1 Mid",
      name: "OG Lemon",
      brand: "Jordan",
      price: 289.90,
      date: "2023-07-16",
      rating: 3,
      onSale: true
    },
    {
      model: "Jordan 1 Mid",
      name: "Breeze",
      brand: "Jordan",
      price: 289.90,
      date: "2023-08-22",
      rating: 5,
      onSale: false
    },
    {
      model: "Puma Cali",
      name: "Cleopatra",
      brand: "Puma",
      price: 189.90,
      date: "2023-08-01",
      rating: 3,
      onSale: false
    },
    {
      model: "Adidas Superstar",
      name: "Minions",
      brand: "Adidas",
      price: 189.90,
      date: "2023-01-22",
      rating: 2,
      onSale: true
    },
    {
      model: "Adidas Superstar",
      name: "Spider-man",
      brand: "Adidas",
      price: 189.90,
      date: "2022-05-16",
      rating: 2,
      onSale: false
    },
    {
      model: "Fila Raptor",
      name: "Safari",
      brand: "Fila",
      price: 189.90,
      date: "2020-11-10",
      rating: 1,
      onSale: false
    },
    
    
  ];
  

  return (
    <main className={`${styles.sneakerPage} ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Home"/>
        <div className={styles.banner}>
          
            <Image alt="nikeaf1" fill="true" className={styles.image} src="/kraken.jpg" />
            <div className={styles.shader}>
                <div className={styles.text}>
                    <h1 className={styles.title}>Get the Hottest Kickz</h1>
                </div>
            </div>
        </div>
        <SneakersContextProvider>
        <SneakerListing sneakers={sneakers} />
        </SneakersContextProvider>
    
    </main>
  )
}
