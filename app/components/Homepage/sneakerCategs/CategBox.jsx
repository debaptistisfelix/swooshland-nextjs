import styles from './CategBox.module.css'
import Image from 'next/image'

export default function CategBox({logo, name, handleClick}) {
  return (
   <main onClick={()=>{handleClick(name)}} className={styles.box}>
           
            <Image className={styles.image} src={logo} alt={name} style={{objectFit: "contain"}} fill={true} />
   </main>
  )
}