"use client"

import styles from './EditAddressForm.module.css'
import { useState } from 'react'
import { useContext } from 'react'
import { UserAddressesContext } from '@app/context/UserAddressesContext'
import { toast } from 'react-hot-toast'

export default function EditAddressForm({toggleEditModal, address}) {
  const {name, surname, phone, street, zip, city, state, country} = address
  const {addAddressToAddressList, removeAddressFromAddressList, isLoading, setIsLoading, fetchAddresses} = useContext(UserAddressesContext)
  const [editData, setEditData] = useState({
    name: name,
    surname: surname,
    phone: phone,
    street: street,
    zip: zip,
    city: city,
    state: state,
    country: country
});

const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEditData({...editData, [name]: value})
};

const submitUpdatedAddress = async (address) => {
  event.preventDefault();
  if(
    editData.name === "" ||
    editData.surname === "" ||
    editData.phone === "" ||
    editData.street === "" ||
    editData.zip === "" ||
    editData.city === "" ||
    editData.state === "" ||
    editData.country === ""
  ){
    return toast.error("Please provide all the necessary infos")
  }
  try{
    setIsLoading({...isLoading, updateingAddress:true})
    const response = await fetch(`/api/address/${address.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData)
    })
    if(response.ok){
      const data = await response.json()
      fetchAddresses() ;
      setIsLoading({...isLoading, updateingAddress:false})
      toggleEditModal()
      toast.success("Address updated successfully!",  {
        style: {
            backgroundColor: "#2fbf71",
            color: "#fff",
        },
        iconTheme: {
            primary: "#fff",
            secondary: "#2fbf71",
        },
    })
    }
  } catch(error){
    toast.error("Network Error. Please retry.",  {
      style: {
          backgroundColor: "#d00000",
          color: "#fff",
      },
      iconTheme: {
          primary: "#fff",
          secondary: "#d00000",
      },
  })
    setIsLoading({...isLoading, updateingAddress:false})
    console.log(error)
  }
}
console.log("address : ", address)
console.log("address id : ", address.id)
  return (
    <form  onSubmit={()=>{submitUpdatedAddress(address)}} className={styles.form}>
        <input value={editData.name} onChange={handleInputChange} name="name" type="text" className={`${styles.input} ${styles.name}`} />
        <input value={editData.surname} onChange={handleInputChange} name="surname" type="text" className={`${styles.input} ${styles.surname}`} />
        <input value={editData.phone} onChange={handleInputChange} name="phone" type="text" className={`${styles.input} ${styles.phone}`} />
        <input value={editData.street} onChange={handleInputChange} name="street" type="text" className={`${styles.input} ${styles.address}`} />
        <input value={editData.zip} onChange={handleInputChange} name="zip" type="text" className={`${styles.input} ${styles.cap}`} />
        <input value={editData.city} onChange={handleInputChange} name="city" type="text" className={`${styles.input} ${styles.city}`} />
        <input value={editData.state} onChange={handleInputChange} name="state" type="text" className={`${styles.input} ${styles.state}`} />
        <input value={editData.country} onChange={handleInputChange} name="country" type="text" className={`${styles.input} ${styles.country}`} />
        <div className={styles.editBtnBox}>
            <button onClick={toggleEditModal} className={styles.editCancelBtn}>Cancel</button>
            <button type="submit" className={styles.editSaveBtn}>Save</button>
        </div>
    </form>
  )
}