import styles from './AddressCardCheckOut.module.css'
import { useContext, useEffect } from 'react';
import { UserAddressesContext } from '@app/context/UserAddressesContext';
import { toast } from 'react-hot-toast'

export default function AddressCardCheckOut({address}) {
  const {checkoutAddress,selectCheckOutAddressFromSavedAddresses} = useContext(UserAddressesContext);
  const {name, surname, phone, street, zip, city, state, country} = address;

  useEffect(()=>{
    if(address.default === true){
      selectCheckOutAddressFromSavedAddresses(address)
      toast.success("Default address automatically selected for this order",  {
        style: {
            backgroundColor: "#191919",
            color: "#fff",
        },
        iconTheme: {
            primary: "#fff",
            secondary: "#191919",
        },
    })
    }
  }, [])

  return (
    <main className={styles.card}>
        <label className={styles.container}>
       <input onChange={(()=>{
        selectCheckOutAddressFromSavedAddresses(address);
        toast.success("Address selected successfully!",  {
          style: {
              backgroundColor: "#191919",
              color: "#fff",
          },
          iconTheme: {
              primary: "#fff",
              secondary: "#191919",
          },
      })
        })} checked={address?.id === checkoutAddress?.id  && true}  className={styles.input} type="radio" name="address" id="address" />
       <span className={styles.checkmark}></span>
       </label>
       <div  className={styles.text}>
            <h3 className={styles.info}>{name} {surname}</h3>
            <h3 className={styles.info}>{phone}</h3>
            <h3 className={styles.info}>{street}</h3>
            <h3 className={styles.info}>{zip}, {city}</h3>
            <h3 className={styles.info}>{state}</h3>
            <h3 className={styles.info}>{country}</h3>
        </div>
    </main>
  )
}
