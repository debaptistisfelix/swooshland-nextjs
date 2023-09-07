
import { poppins } from '@app/fonts'
import { useRouter } from 'next/navigation'
import styles from "@app/components/Navbar/NavbarSearch/Advertising/Advertising.module.css"


export default function DiorPoster({closeSearchBox}) {
  const router = useRouter()
  return (
    <main className={`${styles.section} ${poppins.className}`}>
       <div className={styles.buttonBox}>
        <button onClick={()=>{
          closeSearchBox();
          router.push("/item/64f4c431c1af1593c3f0323f")
          }} className={`${styles.btn}`}>EXPLORE</button>
       </div>
       <div className={styles.nameBox}>
       <h1 className={styles.branName}>Nike Air Jordan 1 Mid</h1>
        <h1 className={styles.name}>PETAL PINK</h1>
        <h1 className={styles.name}>$289.90</h1>
       </div>
    </main>
  )
}
