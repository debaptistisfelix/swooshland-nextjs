import styles from './HorizontalDivider.module.css';

export default function HorizontalDivider({color}) {
  return (
    <main
    style={{backgroundColor: color}}
    className={styles.divider}></main>
  )
}
