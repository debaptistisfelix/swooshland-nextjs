import styles from "@app/page.module.css"
import MainBanner from "./components/Homepage/MainBanner/MainBanner"
import Categories from "./components/Homepage/sneakerCategs/Categories"
import ShopByCategories from "./components/Homepage/ShopByCategories/ShopByCategories"
import TrendingItems from "./components/Homepage/TrendingItems/TrendingItems"
import Sales from "./components/Homepage/Sales/Sales"
import getTrendingItems from "./libs/FetchingData/FetchingHomepage/fetchTrendingItems"
import FetchingDataError from "./components/Errors/FetchingDataError/FetchingDataError"
import { Suspense } from "react"

export default async function page() {
  try {
    const trendingItems = await getTrendingItems()


  return (
   <main className={styles.homepage}>
    <MainBanner />
    <section className={styles.homepageSectionsBox}>
      <Categories />
      <div className={styles.lateralLong}>
        <Sales />
      </div>
      <div className={styles.horizontalTop}>
       <Suspense fallback={<div>Loading...</div>}>
       <TrendingItems sneakers={trendingItems}  /> 
        </Suspense>
      </div>
      <div className={styles.horizontalBottom}>
        <ShopByCategories />
      </div>
    </section>
   </main>
  )
  } catch (error) {
    console.log("error", error)
    return (
      <main className={styles.homepage}>
       <MainBanner />
       <section className={styles.homepageSectionsBox}>
         <Categories />
         <div className={styles.lateralLong}>
           <Sales />
         </div>
         <div className={styles.horizontalTop}>
           <FetchingDataError />
         </div>
         <div className={styles.horizontalBottom}>
           <ShopByCategories />
         </div>
       </section>
      </main>
     )
  }
}
