import styles from './CategBox.module.css'
import Image from 'next/image'

export default function CategBox({logo, name, handleClick}) {
  return (
   <main onClick={()=>{handleClick(name)}} className={styles.box}>
           
            <Image 
            sizes="(min-width: 1040px) calc(12.96vw - 40px), (min-width: 620px) calc(16.25vw - 41px), (min-width: 340px) calc(25vw - 20px), calc(-735vw + 2412px)"
            loading='lazy' className={styles.image} src={`/${logo}`} alt={name} style={{objectFit: "contain"}} fill={true} />
   </main>
  )
}
