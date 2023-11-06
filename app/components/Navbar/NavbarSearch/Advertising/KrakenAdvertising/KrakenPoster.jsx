import styles from "@app/components/Navbar/NavbarSearch/Advertising/Advertising.module.css"
import { poppins } from '@app/fonts'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import KrakenPosterImg from '@/public/banner-images/fabioPoster.jpg';

export default function KrakenPoster({closeSearchBox}) {
  const router = useRouter();
  return (
    <main className={`${styles.section} ${poppins.className}`}>
      <Image sizes='400px' placeholder='blur' src={KrakenPosterImg} alt="Dior Poster" layout="fill" objectFit="cover" className={styles.advertisementPoster} />
       <div className={styles.buttonBox}>
       <button onClick={()=>{
          closeSearchBox();
          router.push("/item/64f590312c7ea59ac3681832")
          }} className={`${styles.btn}`}>EXPLORE</button>
     
       </div>
       <div className={styles.nameBox}>
       <h1 className={styles.branName}>Nike Air Force 1</h1>
        <h1 className={styles.name}>L.A. KRAKEN</h1>
        <h1 className={styles.name}>$189.90</h1>
       </div>
    </main>
  )
}
