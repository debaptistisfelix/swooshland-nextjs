
import AccessoriesSection from '@app/components/ItemPage/Accessories/AccessoriesSection/AccessoriesSection'
import styles from './page.module.css'
import { poppins } from '@app/fonts'
import getItemsListData from '@app/libs/FetchingData/FetchItemsListData/fetchItemsListData'
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError'
import getItemData from '@app/libs/FetchingData/FetchingSinglItemData/FetchingSingleItem/fetchItem'

export const metadata = {
  title: 'Accessories - Swooshland Customs',
  description: 'Explore our Custom Accessories collection. Wallets, Backpacks, Lunch-boxes and more.',
} 

export default async function AccessoriesPage() {
 try {
  const accessories = await getItemsListData("accessories")
  const item = await getItemData("64d4f2a72862dff874b44775")

  return (
    <main className={`${styles.accessoriesPage} ${poppins.className}`}>
     <AccessoriesSection accessories={accessories} />
    </main>
  )
 } catch (error) {
  console.error(error)
  const errorObject ={...error}
    return (
      <main className={`pageLoaderContainer`}>
         <FetchingDataError />
      </main>
    )
 }
}
