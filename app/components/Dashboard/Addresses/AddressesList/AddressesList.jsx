"use client"

import styles from './AddressesList.module.css'
import AddressCard from '../AddressCard/AddressCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AddressForm from '../AddressesForm/AddressForm';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader';
import { UserAddressesContext } from '@app/context/UserAddressesContext';
import { useSession } from 'next-auth/react';


export default async function AddressesList() {
  const {
    showFormToAddAddress,
    addresses,
    isLoading,
    somethingIsLoading,
    addAddressToAddressList,
    toggleFormToAddAddress,
    fetchAddresses,
    fetchRemoveAddress,
    selectDefaultAddress
  } = useContext(UserAddressesContext)



  useEffect(()=>{
    fetchAddresses()
  }, [])

  useEffect(()=>{
    if(addresses.length >0){
      const defaultAddressChoice = addresses.find((address) => address.default === true)
      selectDefaultAddress(defaultAddressChoice)
    }
  }, [])

 


  return (
   <main className={styles.list}>
    {addresses.length === 0 && isLoading.fetchingAddresses===false && <p className={styles.noAddresses}>You have no addresses saved.</p>}
    {addresses.length > 0 && isLoading.fetchingAddresses===false &&  addresses.map((address, id)=>{
      return <AddressCard fetchRemoveAddress={fetchRemoveAddress} key={id} address={address} />
    })}
    {somethingIsLoading && <ThreeCirclesLoader  />}
    {isLoading.fetchingAddresses === false &&  <section className={styles.addressFormBox}>
    <h3 
    onClick={toggleFormToAddAddress}
    className={styles.addAddressTitle}>
      <FontAwesomeIcon className={styles.addAddressIcon} icon={faCirclePlus} />
      Add New Shipping Address</h3>
     {showFormToAddAddress === true &&  <AddressForm addAddressToAddressList={addAddressToAddressList} toggleFormToAddAddress={toggleFormToAddAddress} />}
  </section>}
   </main>
  )
}
