"use client"

import styles from './AddressesList.module.css'
import AddressCard from '../AddressCard/AddressCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AddressForm from '../AddressesForm/AddressForm';
import { useState } from 'react';


export default function AddressesList() {
  const [showFormToAddAddress, setShowFormToAddAddress] = useState(true)

  const toggleFormToAddAddress = () => {
    setShowFormToAddAddress(!showFormToAddAddress)
  }

  const addresses = [];

  return (
   <main className={styles.list}>
   {/*  {addresses.length === 0 && <p className={styles.noAddresses}>You have no addresses saved.</p>} */}
    <AddressCard /> 
    <AddressCard /> 
    <AddressCard /> 
  <section className={styles.addressFormBox}>
    <h3 
    onClick={toggleFormToAddAddress}
    className={styles.addAddressTitle}>
      <FontAwesomeIcon className={styles.addAddressIcon} icon={faCirclePlus} />
      Add New Shipping Address</h3>
     {showFormToAddAddress === true &&  <AddressForm toggleFormToAddAddress={toggleFormToAddAddress} />}
  </section>
   </main>
  )
}
