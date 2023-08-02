import styles from './Categories.module.css'
import { poppins } from '@app/fonts'
import CategBox from './CategBox'

export default function Categories() {
    const categories = [
        {
            name: 'Nike',
            logo: "/car.jpg",

        },
        {
            name: 'Adidas',
            logo: "/adidaslogo.png",
        },
        {
            name: 'Puma',
            logo: "/bubina.jpg",
        },
        {
            name:"Jordan",
            logo: "/jordanlogo.png",
        },
        {
            name: 'Fila',
            logo: "/filalogo.png",
        }
    ]
  return (
    <main className={`${styles.categories} ${poppins.className}`}>
        <h2 className={styles.title}>Sneakers Categories</h2>
        <div className={styles.categBox}>
            {categories.map(categ => {
                return <CategBox key={categ.name} name={categ.name} logo={categ.logo} />
            })}

        </div>
    </main>
  )
}
