import styles from './AddressForm.module.css'

export default function AddressForm({toggleFormToAddAddress}) {
  return (
    <main className={styles.form}>
        <input type="text" className={`${styles.input} ${styles.name}`} placeholder='Name'/>
        <input type="text" className={`${styles.input} ${styles.surname}`} placeholder='Surname'/>
        <input type="text" className={`${styles.input} ${styles.phone}`} placeholder='Phone number'/>
        <input type="text" className={`${styles.input} ${styles.address}`} placeholder='Address'/>
        <input type="text" className={`${styles.input} ${styles.cap}`} placeholder='Post code'/>
        <input type="text" className={`${styles.input} ${styles.city}`} placeholder='City'/>
        <input type="text" className={`${styles.input} ${styles.state}`} placeholder='State'/>
        <input type="text" className={`${styles.input} ${styles.country}`} placeholder='Country'/>
        <div className={styles.editBtnBox}>
            <button onClick={toggleFormToAddAddress}  className={styles.editCancelBtn}>Cancel</button>
            <button className={styles.editSaveBtn}>Save</button>
        </div>
    </main>
  )
}
