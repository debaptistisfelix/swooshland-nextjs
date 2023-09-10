"use client"

import styles from './AddressForm.module.css';
import { useState } from 'react';
import { toast } from 'react-hot-toast'
import { useContext } from 'react';
import { UserAddressesContext } from '@app/context/UserAddressesContext';

export default function AddressForm() {
  const {
    formData,
    toggleFormToAddAddress,
    handleInputChange,
    handleSubmit
  } = useContext(UserAddressesContext)

  console.log("formData:", formData)
  
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <input value={formData.name} onChange={handleInputChange} name='name' type="text" className={`${styles.input} ${styles.name}`} placeholder='Name'/>
        <input value={formData.surname} onChange={handleInputChange} name="surname" type="text" className={`${styles.input} ${styles.surname}`} placeholder='Surname'/>
        <input value={formData.phone} onChange={handleInputChange} name="phone" type="text" className={`${styles.input} ${styles.phone}`} placeholder='Phone number'/>
        <input value={formData.street} onChange={handleInputChange} name="street" type="text" className={`${styles.input} ${styles.address}`} placeholder='Address'/>
        <input value={formData.zip} onChange={handleInputChange} name="zip" type="text" className={`${styles.input} ${styles.cap}`} placeholder='Post code'/>
        <input value={formData.city} onChange={handleInputChange} name="city" type="text" className={`${styles.input} ${styles.city}`} placeholder='City'/>
        <input value={formData.state} onChange={handleInputChange} name="state" type="text" className={`${styles.input} ${styles.state}`} placeholder='State'/>
        <input value={formData.country} onChange={handleInputChange} name="country" type="text" className={`${styles.input} ${styles.country}`} placeholder='Country'/>
        <div className={styles.editBtnBox}>
            <button onClick={toggleFormToAddAddress}  className={styles.editCancelBtn}>Cancel</button>
            <button type="submit" className={styles.editSaveBtn}>Save</button>
        </div>
    </form>
  )
}
