"use client"
import styles from './Categories.module.css'
import { poppins } from '@app/fonts'
import CategBox from './CategBox'
import queryString from 'query-string';
import { useRouter } from "next/navigation";

export default function Categories() {
    const router = useRouter()
    const categories = [
        
       
       
        {
            name: 'Puma',
            logo: "/puma-logo.png",
        },
        {
            name: 'Nike',
            logo: "/nike-logo.png",

        },
        {
            name: 'Adidas',
            logo: "/adidaslogo.png",
        },
        {
            name:"Jordan",
            logo: "/jordan-logo.png",
        },
        {
            name: 'Fila',
            logo: "/fila-logo.png",
        }
    ]

    const handleBrandFilterSelection = (brand) => {
        const queryParams = queryString.stringify({brand});
        router.push(`/sneakers?${queryParams}`)
      
    }
  return (
    <main className={`${styles.categories} ${poppins.className}`}>
        <h2 className={styles.title}>Sneakers Categories</h2>
        <div className={styles.categBox}>
            {categories.map(categ => {
                return <CategBox 
                handleClick={handleBrandFilterSelection}
                key={categ.name} name={categ.name} logo={categ.logo} />
            })}

        </div>
    </main>
  )
}
