"use client"

import { useState, createContext, useEffect, useContext} from "react";
import { toast } from 'react-hot-toast'
import { useSession } from "next-auth/react"
import { CartContext } from "./CartContext";

export const UserAddressesContext = createContext();

export default function UserAddressesContextProvider({ children }) {
    /* AddressListing State Variables */
    const [showFormToAddAddress, setShowFormToAddAddress] = useState(true)
    const [addresses, setAddresses] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState(null)
    const [checkoutAddress, setCheckoutAddress] = useState(null)
    const { data: session, status } = useSession()
    const {checkItemsAvailability, itemsAvailabilityWasChecked } = useContext(CartContext)
 
    const [isLoading, setIsLoading] = useState({
        fetchingAddresses: false,
        addingNewAddress: false,
        removingAddress: false,
        updateingAddress: false,
        checkoutLoading: false,
        checkingIfLoggedIn: false
      })
    
    const somethingIsLoading = Object.values(isLoading).some((item) => item === true)
    
    /* AddressForm State Variables */
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        street: "",
        zip: "",
        city: "",
        state: "",
        country: ""
      })
    
      const addAddressToAddressList = (address) => {
        setAddresses([...addresses, address])

      };
    
      const removeAddressFromAddressList = (address) => {
       
        setAddresses(addresses.filter((item) => item !== address)) 
      }
    
      const toggleFormToAddAddress = () => {
        setShowFormToAddAddress(!showFormToAddAddress)
      }

      const updateDefaultAddress = async (address) => {
        try{
          setIsLoading({...isLoading, updateingAddress: true})
          const response = await fetch(`/api/address/${address.id}/default`, {
            method: "PATCH",
          })
          if(response.ok){
            const data = await response.json()
            fetchAddresses();
            toast.success("Default address updated successfully!",  {
              style: {
                  backgroundColor: "#191919",
                  color: "#fff",
              },
              iconTheme: {
                  primary: "#fff",
                  secondary: "#191919",
              },
          })
          } else {
            toast.error("Error updating default address",  {
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
        } catch(error){
          console.log(error)
          toast.error("Error updating default address",  {
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
      }

      const selectDefaultAddress = (address) => {
        setDefaultAddress(address)
      }

      const fetchAddresses = async () => {
        try{
          setIsLoading({...isLoading, fetchingAddresses: true})
          const response = await fetch("/api/address")
          if(response.ok){
            const data = await response.json()
            setAddresses(data)
            selectDefaultAddress(data.find((address) => address.default === true))
            setIsLoading({...isLoading, fetchingAddresses: false})
          } else {
            toast.error("Error fetching addresses")
            setIsLoading({...isLoading, fetchingAddresses: false})
          }
        } catch(error){
          toast.error("Network Error:", error)
          setIsLoading({...isLoading, fetchingAddresses: false})
        }
      }
    
      const fetchRemoveAddress = async (address) => {
        try{
          setIsLoading({...isLoading, removingAddress: true})
          const response = await fetch(`/api/address/${address.id}`, {
            method: "DELETE"
          })
          if(response.ok){
            removeAddressFromAddressList(address)
            setIsLoading({...isLoading, removingAddress: false})
            toast.success("Address deleted successfully!",  {
              style: {
                  backgroundColor: "#191919",
                  color: "#fff",
              },
              iconTheme: {
                  primary: "#fff",
                  secondary: "#191919",
              },
          })
          } else {
            toast.error("Error deleting address. Please retry",  {
              style: {
                  backgroundColor: "#191919",
                  color: "#fff",
              },
              iconTheme: {
                  primary: "#fff",
                  secondary: "#191919",
              },
          })
            setIsLoading({...isLoading, removingAddress: false})
          }
        } catch(error){
          toast.error("Network Error",  {
            style: {
                backgroundColor: "#191919",
                color: "#fff",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#191919",
            },
        })
          setIsLoading({...isLoading, removingAddress: false})
          console.log(error)
        }
      }

      /* Address Form Variables */

      const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
      }
    
      const resetInputs = () => {
        setFormData({
          name: "",
          surname: "",
          phone: "",
          street: "",
          zip: "",
          city: "",
          state: "",
          country: ""
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(
          formData.name === "" ||
          formData.surname === "" ||
          formData.phone === "" ||
          formData.street === "" ||
          formData.zip === "" ||
          formData.city === "" ||
          formData.state === "" ||
          formData.country === ""
        ){
          return toast.error("Please provide all the necessary infos",  {
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
        try{
          setIsLoading({...isLoading, addingNewAddress: true})
          const response = await fetch("/api/address/new", {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          })
          if(response.ok){
            const data = await response.json()
            addAddressToAddressList(data)
            setIsLoading({...isLoading, addingNewAddress: false})
            toast.success("Address added successfully!",  {
              style: {
                  backgroundColor: "#191919",
                  color: "#fff",
              },
              iconTheme: {
                  primary: "#fff",
                  secondary: "#191919",
              },
          })
            resetInputs();
          } else {
            toast.error('Error submitting form',  {
              style: {
                  backgroundColor: "#191919",
                  color: "#fff",
              },
              iconTheme: {
                  primary: "#fff",
                  secondary: "#191919",
              },
          })
            setIsLoading({...isLoading, addingNewAddress: false})
          }
        } catch(error){
          toast.error('Network error while posting address',  {
            style: {
                backgroundColor: "#191919",
                color: "#fff",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#191919",
            },
        })
          setIsLoading({...isLoading, addingNewAddress: false})
        }
    
      }

      /* CHECKOUT ADDRESS FORM */

      const [showCheckoutAddressForm, setShowCheckoutAddressForm] = useState(false)

      const [checkoutFormData, setCheckoutFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        street: "",
        zip: "",
        city: "",
        state: "",
        country: ""
    })

   

    const handleCheckoutInputChange = (e) => {
      setCheckoutAddress(null);
      /* setopenAddressOptionBox(false) */
      const {name, value} = e.target;
      setCheckoutFormData({...checkoutFormData, [name]: value})
  };
  const resetCheckoutFormDataInputs = () => {
    setCheckoutFormData({
      name: "",
      surname: "",
      phone: "",
      email: "",
      street: "",
      zip: "",
      city: "",
      state: "",
      country: ""
    })
  };

  const toggleshowCheckoutAddressForm = (option) => {
    if(option === true){
      setShowCheckoutAddressForm(true)
    } else if(option === false){
      setShowCheckoutAddressForm(false)
    } else {
      setShowCheckoutAddressForm(!showCheckoutAddressForm)
    }
  }
  /* PAYMENT METHOD SECTION */

  const [openAddressOptionBox, setopenAddressOptionBox] = useState(true)

  const toggleOpenAddressOptionBox = ()=>{
    setopenAddressOptionBox(!openAddressOptionBox);
  }

  const selectCheckOutAddressFromSavedAddresses = (address) => {
    if(status === "authenticated"){
      setCheckoutAddress({...address, email: session.user.email});
      resetCheckoutFormDataInputs();
      setShowCheckoutAddressForm(false) 
    }
   
   
  }



  const selectCheckOutAddressFromCheckoutForm = (address) => {
    if(checkoutFormData.name !== "" && checkoutFormData.surname !== "" && checkoutFormData.phone !== "" && checkoutFormData.street !== "" && checkoutFormData.zip !== "" && checkoutFormData.city !== "" && checkoutFormData.state !== "" && checkoutFormData.country !== ""){
      setCheckoutAddress(address);
    } else {
      toast.error("Please provide all the necessary infos to confirm the address", {
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
  }

 

   const checkValidationBeforePayment = (checkBoxValue) =>{
    if(checkBoxValue === false){
      toast.error("Please accept Terms & Conditions to proceed to payment",  {
        style: {
            backgroundColor: "#191919",
            color: "#fff",
        },
        iconTheme: {
            primary: "#fff",
            secondary: "#191919",
        },
    })
    } else if (checkBoxValue === true){
      if(checkoutAddress === null){
        toast.error("Please provide an address to proceed to payment",  {
          style: {
              backgroundColor: "#191919",
              color: "#fff",
          },
          iconTheme: {
              primary: "#fff",
              secondary: "#191919",
          },
         })
        console.log("checkoutAddress", checkoutAddress)
      } else {
        if(itemsAvailabilityWasChecked === false){
          toast.success("Checking Cart Items Availability",  {
            style: {
                backgroundColor: "#191919",
                color: "#fff",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#191919",
            },
        })
          checkItemsAvailability();
        } else if(itemsAvailabilityWasChecked === true){
          toast.success("Moving to Payment",  {
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
      }
    }
    
  } 






 



    return (
        <UserAddressesContext.Provider value={{
            showFormToAddAddress,
            addresses,
            isLoading,
            setIsLoading,
            somethingIsLoading,
            formData,
            addAddressToAddressList,
            removeAddressFromAddressList,
            toggleFormToAddAddress,
            fetchAddresses,
            fetchRemoveAddress,
            handleInputChange,
            resetInputs,
            handleSubmit,
            /* default address  */
            selectDefaultAddress,
            updateDefaultAddress,
            /* checkout address form */
            checkoutFormData,
            handleCheckoutInputChange,
            showCheckoutAddressForm,
            toggleshowCheckoutAddressForm,
            /* Payment method section */
           
            checkoutAddress,
            selectCheckOutAddressFromSavedAddresses,
            selectCheckOutAddressFromCheckoutForm,
            openAddressOptionBox,
             toggleOpenAddressOptionBox,
            checkValidationBeforePayment
        }}>
            {children}
        </UserAddressesContext.Provider>    
    )
}