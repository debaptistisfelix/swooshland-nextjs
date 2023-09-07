"use client"

import { useState, createContext } from "react";
import { toast } from "react-hot-toast";





export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {

    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState({
        creatingOrder: false,
    });

    const createOrder = async (orderData) => {
        setIsLoading({ creatingOrder: true });
        console.log("when creating function this is passed to body:", orderData.boughtItems)
        try{
            const response = await fetch("/api/order/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subtotal: orderData.subtotal,
                    shipping: orderData.shipping,
                    total: orderData.total,
                    cartItems: orderData.cartItems,
                    orderAddress: orderData.orderAddress,
                    boughtItems: orderData.boughtItems
                })
            });
                const data = await response.json();
                setOrder(data.id);
                setIsLoading({ creatingOrder: false });
                toast.success("Redirecting to Payment",  {
                    style: {
                        backgroundColor: "#2fbf71",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#2fbf71",
                    },
                });
           
        }
        catch(error){
            console.log(error);
            setIsLoading({ creatingOrder: false });
            toast.error("Error while creating order. please retry.", {
                style: {
                    backgroundColor: "#d00000",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#d00000",
                },
            });
        }
    };
    return (
        <OrderContext.Provider value={{
            order,
            createOrder,
            isLoading
        }}>
            {children}
        </OrderContext.Provider>
    )
}