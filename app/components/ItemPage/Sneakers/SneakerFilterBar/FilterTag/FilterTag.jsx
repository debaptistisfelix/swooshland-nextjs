import { faX } from '@fortawesome/free-solid-svg-icons'
import styles from './FilterTag.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function FilterTag({filterOption}) {
  return (
    <main className={styles.tag}>
        <h1 className={styles.filterName}>{filterOption}</h1>
        <FontAwesomeIcon icon={faX} className={styles.icon}/>
    </main>
  )
}
