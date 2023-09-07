
import styles from './page.module.css'
import { poppins } from '@app/fonts'
import SneakerSection from '@app/components/ItemPage/Sneakers/SneakerSection/SneakerSection'
import getItemsListData from '@app/libs/FetchingData/FetchItemsListData/fetchItemsListData'
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError'



export const metadata = {
  title: 'Sneakers - Swooshland Customs',
  description: 'Explore our Custom Sneakers collection. Jordan',
} 

export default async  function SneakersPage() {
  try{
    const sneakers = await getItemsListData("sneakers")
  return (
    <main className={`${styles.sneakerPage} ${poppins.className}`}>
       <SneakerSection sneakers={sneakers} />
    </main>
  )
  }
  catch(error){
    console.log(error)
    return (
      <main className={`pageLoaderContainer`}>
       
         <FetchingDataError />
      </main>
    )
  }
}
