
import styles from './page.module.css'
import { poppins } from '@app/fonts'
import SneakerSection from '@app/components/ItemPage/Sneakers/SneakerSection/SneakerSection'

export const metadata = {
  title: 'Sneakers - Swooshland Customs',
  description: 'Explore our Custom Sneakers collection. Jordan',
} 

export default function SneakersPage() {
  
  return (
    <main className={`${styles.sneakerPage} ${poppins.className}`}>
       <SneakerSection />
    </main>
  )
}
