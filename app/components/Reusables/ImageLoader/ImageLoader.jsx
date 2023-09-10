import styles from './ImageLoader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileArrowDown} from '@fortawesome/free-solid-svg-icons';

export default function ImageLoader() {
  return (
    <main className={styles.loader}>
         <FontAwesomeIcon icon={faFileArrowDown} className={styles.loaderIcon} />
    <p className={styles.loaderText}>Loading...</p>
    </main>
  )
}
