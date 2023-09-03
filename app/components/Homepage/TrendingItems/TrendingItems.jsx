import styles from './TrendingItems.module.css';
import { poppins } from '@app/fonts';
import ShopItemCard from '@app/components/ItemCards/ShopItemCard/ShopItemCard';
import { useState, useEffect } from 'react';
import NavSearchLoader from '@app/components/Navbar/NavbarSearch/NavSearchLoader/NavSearchLoader';


export default function TrendingItems() {
  const [sneakers, setSneakers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
       
  useEffect(()=>{
   fetchSneakers();
  },[])

   const fetchSneakers = async ()=>{
    setIsLoading(true)
       try{
      
         const response = await fetch("/api/item");
         const data = await response.json();
        
         setSneakers(data.slice(0, 6));
         setIsLoading(false)
       } catch(error){
         console.log(error)
         setIsLoading(false)
       }
   }
  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <h2 className={styles.title}>Trending Products</h2>
        <section className={styles.list}>
            {sneakers.length > 0 && isLoading === false && sneakers.map((sneaker, index)=>{
                return <ShopItemCard key={index} sneaker={sneaker}/>
            })}
        </section>
        {isLoading && <div className={styles.loaderContainer}>
          <NavSearchLoader /></div>}
    </main>
  )
}
