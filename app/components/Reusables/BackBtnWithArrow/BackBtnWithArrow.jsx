import styles from './BackBtnWithArrow.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function BackBtnWithArrow({path, text}) {
  return (
   <main className={styles.container}>
    <Link href={`${path}`} className="Link smallNavBackBtnBox">
            <FontAwesomeIcon icon={faArrowLeft} className="smallNavLeftArrowIcon" />
            <span className="smallNavBackBtn">{text}</span>
            
        </Link>
   </main>
  )
}
