import styles from "@app/components/Navbar/NavbarSearch/Advertising/Advertising.module.css"
import { poppins } from '@app/fonts'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import OrangePosterImg from '@/public/PosterOgOrange.jpg';

export default function OrangePoster({closeSearchBox}) {
  const router = useRouter();
  return (
    <main className={`${styles.section} ${poppins.className}`}>
      <Image sizes='400px' placeholder='blur' src={OrangePosterImg} alt="Dior Poster" layout="fill" objectFit="cover" className={styles.advertisementPoster} />
       <div className={styles.buttonBox}>
       <button onClick={()=>{
          closeSearchBox();
          router.push("/item/64f4c91ac1af1593c3f0325c")
          }} className={`${styles.btn}`}>EXPLORE</button>
       
       </div>
       <div className={styles.nameBox}>
       <h1 className={styles.branName}>Nike Air Jordan 1 MId</h1>
        <h1 className={styles.name}>O.G. ORANGE</h1>
        <h1 className={styles.name}>$289.90</h1>
       </div>
    </main>
  )
}
