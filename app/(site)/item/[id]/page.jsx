import ItemSection from '@app/components/ItemPage/SingleItemPage/ItemSection/ItemSection'
import getItemData from '@app/libs/FetchingData/FetchingSinglItemData/FetchingSingleItem/fetchItem'
import getItemRelated from '@app/libs/FetchingData/FetchingSinglItemData/fetchItemRelated'
import { Suspense } from 'react'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError'

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id
 const baseUrl = process.env.BASE_URL

  try{
    // fetch data
  const product = await getItemData(id)
 
  // optionally access and extend (rather than replace) parent metadata
  
  const title = `${product.model} - ${product.name}`
 
  return {
    title: title,
  }
  }catch(error){
    return {
      title: "Error 404 - Swooshland Customs"
    }
  }
} 



export default async function page({ params: { id } }) {
  try {
    const item = await getItemData(id)
    const relatedItems =  getItemRelated(id)

    return (
      <main className="pageLoaderContainer">
        <Suspense fallback={<ThreeCirclesLoader />}>
          <ItemSection item={item} relatedPromise={relatedItems} />
        </Suspense>
      </main>
    )
  } catch (error) {
    console.log(error)
    return (
    <main className="pageLoaderContainer">
      <FetchingDataError />
    </main>
    )
  }
}
