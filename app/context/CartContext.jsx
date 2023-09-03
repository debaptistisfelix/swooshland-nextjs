"use client"
import { useState, createContext, useEffect } from "react"
import { toast } from "react-hot-toast"
import { useSession } from "next-auth/react"
import { getCookie, setCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])
    const [deletedCartItemsBeforeCheckout, setDeletedCartItemsBeforeCheckout] = useState([]);
    const router = useRouter()
    const [itemsAvailabilityWasChecked, setItemsAvailabilityWasChecked] = useState(false);
    const [appliedDiscount, setAppliedDiscount] = useState(false)
    const [cartSummary, setCartSummary] = useState({
        subtotal: 0,
        discount: 0,
        discountedSubtotal: 0,
        shipping: 0,
        total: 0

    })
    const {data: session, status} = useSession()
    const [isCartLoading, setCartIsLoading] = useState({
        fetchingCartItems: true,
        addingItemToCartItems: null,
        removingCartItem: false,
        checkingAvailability: false
    })
    const [chosenSize, setChosenSize] = useState(null);

 
 
   const setGuestIdForNotLoggedUsers = ()=>{
    const guestId = getCookie("guestId");
    if (!guestId) {
        const randomGuestId = uuidv4();
        setCookie("guestId", randomGuestId, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            path: "/",

        });
    }
   }

    const setCartLoading = (action, value) => {
        setCartIsLoading({...isCartLoading, [action]: value})
    }

    const calculateSubtotal = () => {
        let subtotal = 0;
        cartItems.forEach((cartItem) => {
            subtotal += cartItem.item.price;
        });
        return Number(subtotal.toFixed(2));
    };

    const calculateDiscountedSubtotal = () => {
        let discountedSubtotal = 0;
        cartItems.forEach((cartItem) => {
            if(cartItem.item.onSale === false){
                discountedSubtotal += cartItem.item.price;
            } else if (cartItem.item.onSale === true){
                let discountedPrice = cartItem.item.price - (cartItem.item.price * (cartItem.item.discountPercentage / 100)) ;
                /* setAppliedDiscount(true) */
                discountedSubtotal += discountedPrice
            }
        });
        return Number(discountedSubtotal.toFixed(2));
    };

    const calculateCartSummary = () => {
        const subtotal = calculateSubtotal();
        const discountedSubtotal = calculateDiscountedSubtotal();
        setCartSummary({... cartSummary, subtotal: subtotal, discountedSubtotal: discountedSubtotal})
    };

    const calculateTotalAndShipping = () => {
        let shippingCoast = 0;
        let total = 0;
        if(appliedDiscount === true){
            if( cartSummary.discountedSubtotal >= 200){
                shippingCoast = 0;
            } else {
                shippingCoast = 20;
            }
        }else {
            if( cartSummary.subtotal >= 200){
                shippingCoast = 0;
            } else {
                shippingCoast = 20;
            }
        }
        if(appliedDiscount === true){
            total = cartSummary.discountedSubtotal + shippingCoast;
        } else {
            total = cartSummary.subtotal + shippingCoast;
        }
        setCartSummary({... cartSummary, shipping: shippingCoast, total: Number(total.toFixed(2))})
    }

    useEffect(()=>{
        calculateTotalAndShipping();
    }, [cartSummary.subtotal, cartSummary.discountedSubtotal])

    useEffect(()=>{
        calculateCartSummary();

        if(cartItems.length === 0){
            setAppliedDiscount(false)
        } else if( cartItems.length > 0 && cartItems.some(cartItem => cartItem.item.onSale === true)){
            setAppliedDiscount(true);
        }

        /* if(cartItems.length > 0 && itemsAvailabilityWasChecked === true){
            calculateCartSummary();
            setCartSummaryWasUpdatedAfterAvailabilityCheck(true)
        } */


    },[cartItems, itemsAvailabilityWasChecked])

    const fetchCartItems = async () => {
            try{
                setCartLoading("fetchingCartItems", true)
                const response = await fetch(`/api/cartItem/`, {
                    method: "GET"
                })
                const data = await response.json()
                if(response.ok){
                    setCartItems(data)
                    console.log(data)
                    setCartLoading("fetchingCartItems", false)
                    toast.success("cartItems fetched",  {
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
                    setCartLoading("fetchingCartItems", false)
                    toast.error("error while fetching cartItems",  {
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
            }catch(error){
                console.log(error)
                setCartLoading("fetchingCartItems", false)
                toast.error("error while fetching cartItems", {
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
    };

    const fetchGuestCartItems = async () => {
        const guestId = getCookie("guestId");
        if(guestId && status === "unauthenticated"){
            try{
                setCartLoading("fetchingCartItems", true)
                const guestId = getCookie("guestId");
                const response = await fetch(`/api/guestCartItem/${guestId}`, {
                    method: "GET"
                })
                const data = await response.json()
                if(response.ok){
                    setCartItems(data)
                    console.log(data)
                    setCartLoading("fetchingCartItems", false)
                    toast.success(" Guest cartItems fetched",  {
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
                    setCartLoading("fetchingCartItems", false)
                    toast.error("error while fetching cartItems",  {
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
            }catch(error){
                console.log(error)
                setCartLoading("fetchingCartItems", false)
                toast.error("error while fetching cartItems", {
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
};

    const addItemToCartItems = async (itemId) => {
        if(chosenSize !== null){
            setCartLoading("addingItemToCartItems", true)
            const guestId = getCookie("guestId");
            try{
                const response = await fetch(`/api/cartItem/new`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        itemId: itemId,
                        chosenSize: chosenSize,
                        guestId: guestId
                    })
                })
                const data = await response.json()
                if(response.status === 200){
                    setCartItems([...cartItems, data])
                    setChosenSize(null)
                    console.log(data)
                    setCartLoading("addingItemToCartItems", false)
                    setTimeout(()=>{setCartLoading("addingItemToCartItems", null)}, 1000)
                    toast.success("Item added to cart",  {
                        style: {
                            backgroundColor: "#191919",
                            color: "#fff",
                        },
                        iconTheme: {
                            primary: "#fff",
                            secondary: "#191919",
                        },
                    })
                } else if(response.status !== 200){
                    setChosenSize(null)
                    console.log(data)
                    setCartLoading("addingItemToCartItems", false)
                    setTimeout(()=>{setCartLoading("addingItemToCartItems", null)}, 1000)
                    toast.error(data,  {
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
                    console.log(data)
                    setChosenSize(null)
                    setCartLoading("addingItemToCartItems", false)
                    setTimeout(()=>{setCartLoading("addingItemToCartItems", null)}, 1000)
                    toast.error("error while adding item to cart",  {
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
            catch(error){
                setChosenSize(null)
                setCartLoading("addingItemToCartItems", false)
                setTimeout(()=>{setCartLoading("addingItemToCartItems", null)}, 1000)
                toast.error("error while adding item to cart",  {
                    style: {
                        backgroundColor: "#191919",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#191919",
                    },
                })
                console.log(error)
            }
        } else {
            toast.error("Please select a size",  {
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
    };

    const deleteCartItemFromCart = async (cartItem) => {
        const {availableSizeId, id, item} = cartItem
        
        try{
            setCartLoading("removingCartItem", true)
            const response = await fetch(`/api/cartItem/${id}/${availableSizeId}`, {
                method: "DELETE",
            })
            const data = await response.json()
            console.log(data);
            if(response.ok){
                setCartItems(cartItems.filter((item) => item.id !== cartItem.id))
                setCartLoading("removingCartItem", false)
                toast.success(`${item.model} - ${item.name} removed from cart`,  {
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
                setCartLoading("removingCartItem", false)
                toast.error("error while removing item from cart",  {
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
            setCartLoading("removingCartItem", false)
            toast.error("error while removing item from cart", {
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

    };

    const deletCartItemsFromAnArray = async (cartItemsIds) => {
        try{
            setCartIsLoading("removingCartItem", true)
            const response = await fetch("/api/cartItem/deleteMany", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                 body: JSON.stringify({
                    cartItemsIds : cartItemsIds
                }) 
            })
            const data = await response.json()
            console.log(data); 
            if(response.ok){
                setCartItems(cartItems.filter((cartItem) => !cartItemsIds.includes(cartItem.id)))
                setCartLoading("removingCartItem", false)
                setItemsAvailabilityWasChecked(true) 
                setTimeout(()=>{
                    setItemsAvailabilityWasChecked(false);
                }, 30000)
                toast.success("Removed Cart Items that are no more available",  {
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
                setCartLoading("removingCartItem", false)
                toast.error("Error while removing items",  {
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
        catch(error){
            console.log(error);
            setCartLoading("removingCartItem", false)
            toast.error("Error while requesting items deleting",  {
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
 
        calculateCartSummary();
   
    }

    

    const checkItemsAvailability = async () => {
        console.log("loading:", isCartLoading.checkingAvailability)
        try{
           setCartLoading("checkingAvailability", true)
            const response = await fetch("api/cartItem/checkAvailability", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cartItems
                })
            })
            console.log("loading:2", isCartLoading.checkingAvailability)
            const data = await response.json()
            console.log(data)
            if(response.ok && data.cartItemsToDelet > 0){
                setCartLoading("checkingAvailability", false)
                toast.error("Some Items are not more available in the chosen size and will be removed from your cart", {
                    style: {
                        backgroundColor: "#191919",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#191919",
                    },
                }) 
                setDeletedCartItemsBeforeCheckout(data.cartItemsToDelete);
                const cartItemsIdsArray = data.cartItemsToDelete.map(cartItem => cartItem.id);
                console.log("Array of cartItems to delet:", cartItemsIdsArray)
                deletCartItemsFromAnArray(cartItemsIdsArray)
                window.scrollTo(0, 0);
                
               
            } else if (response.ok && data.cartItemsToDelet === 0){
                setCartLoading("checkingAvailability", false)
                setDeletedCartItemsBeforeCheckout([]);
                setItemsAvailabilityWasChecked(true) 
                setTimeout(()=>{
                    setItemsAvailabilityWasChecked(false);
                }, 30000)
              
                toast.success("All items are still available. Click the button again to Complete Order", {
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
        }catch(error){
            console.log(error)
            setItemsAvailabilityWasChecked(false) 
            setCartLoading("checkingAvailability", false)
            toast.error("Error while checking the items availability before checkout. Retry.", {
                style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
            }) 
            setItemsAvailabilityWasChecked(false)
        }
    }

    const moveBackToCartIfCartWasEmptied = () => {
        
        router.push("/cart")
        toast.success("Your Cart is empty. You've been redirected to the Cart Page", {
            style: {
                backgroundColor: "#191919",
                color: "#fff",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#191919",
            },
        })
    };

    const checkIfThereAreExpiredCartItems = async () => {
        console.log("checkinng if old cartItems are present")
        try{
            const response = await fetch("/api/cartItem/cleanUpOldGuestCartItems", {
                method : "GET"
            }); 
            const data = await response.json()
            console.log("Old items:",data)
            fetchGuestCartItems()
        }catch(error){
            console.log(error)
        }
    };

  
    return (
        <CartContext.Provider value={{
            isCartLoading,
            cartItems,
            setCartItems,
            fetchCartItems,
            addItemToCartItems,
            chosenSize,
            setChosenSize,
            calculateCartSummary,
            calculateSubtotal,
            calculateDiscountedSubtotal,
            cartSummary,
            appliedDiscount,
            deleteCartItemFromCart,
            setGuestIdForNotLoggedUsers,
            fetchGuestCartItems,
            checkItemsAvailability,
            moveBackToCartIfCartWasEmptied,
            checkIfThereAreExpiredCartItems,
            itemsAvailabilityWasChecked,
            setItemsAvailabilityWasChecked,
            deletedCartItemsBeforeCheckout,
            setDeletedCartItemsBeforeCheckout
        

        }}>
            {children}
        </CartContext.Provider>
    )
};