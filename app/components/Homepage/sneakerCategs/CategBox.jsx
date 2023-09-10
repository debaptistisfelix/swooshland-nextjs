import styles from './CategBox.module.css'
import Image from 'next/image'

export default function CategBox({logo, name, handleClick}) {
  return (
   <main onClick={()=>{handleClick(name)}} className={styles.box}>
           
            <Image 
            sizes="100vw"
             srcset={`/_next/image?url=%2F${logo}&w=640&q=75 640w, /_next/image?url=%2F${logo}&w=750&q=75 750w, /_next/image?url=%2F${logo}&w=828&q=75 828w,             /_next/image?url=%2F${logo}&w=1080&q=75 1080w,             /_next/image?url=%2F${logo}&w=1200&q=75 1200w,             /_next/image?url=%2F${logo}&w=1920&q=75 1920w, /_next/image?url=%2F${logo}&w=2048&q=75 2048w,             /_next/image?url=%2F${logo}&w=3840&q=75 3840w`   }
             onLoadingComplete={() => console.log(`${name} Image loaded`)}
            loading='lazy' className={styles.image} src={`/${logo}`} alt={name} style={{objectFit: "contain"}} fill={true} />
   </main>
  )
}
