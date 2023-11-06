import styles from "@app/components/Navbar/NavbarSearch/Advertising/Advertising.module.css"
import { poppins } from '@app/fonts'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import LeopardPosterImg from '@/public/PosterLeo.jpg';

export default function LeoPoster({closeSearchBox}) {
  const router = useRouter();
  return (
    <main className={`${styles.section} ${poppins.className}`}>
      <Image sizes='400px' placeholder='blur' src={LeopardPosterImg} alt="Dior Poster" layout="fill" objectFit="cover" className={styles.advertisementPoster} />
       <div className={styles.buttonBox}>
       <button onClick={()=>{
          closeSearchBox();
          router.push("/item/64f598332c7ea59ac36818d6")
          }} className={`${styles.btn}`}>EXPLORE</button>
      
       </div>
       <div className={styles.nameBox}>
        <h1 className={styles.branName}>Nike Air force 1</h1>
        <h1 className={styles.name}>LEOPARD</h1>
        <h1 className={styles.name}>$189.90</h1>
       </div>
    </main>
  )
}