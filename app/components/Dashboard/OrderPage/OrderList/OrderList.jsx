"use client"

import OrderBlock from '../OrderBlock/OrderBlock';
import styles from './OrderList.module.css';
import { useState, useEffect } from 'react';
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader';
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fetchOrdersState, setFetchOrdersState] = useState({
        isLoading: false,
        isError: false,
    });

    const fetchOrders = async ()=>{
        try{
          setFetchOrdersState((prevState)=> ({...prevState, isLoading: true}))
            const response = await fetch('/api/order');
            if(!response.ok){
                throw new Error("Something went wrong!")
            }
            const data = await response.json();
            setOrders(data);
            setFetchOrdersState({
                isLoading: false,
                isError: false,
            })
        }
        catch(error){
          console.log(error)
          setFetchOrdersState({
            isLoading: false,
            isError: true,
        })
        }
       
    }

    useEffect(()=>{
        fetchOrders();
    },[])


  return (
   <main className={styles.list}>
    {orders.length === 0 && fetchOrdersState.isLoading === false && fetchOrdersState.isOrder === false && <h4 className={styles.noOrders}>You have no orders yet.</h4>}
    {orders.length > 0 && fetchOrdersState.isLoading === false && fetchOrdersState.isError === false && orders.map(order => {
        return <OrderBlock key={order.id} order={order} />
    })}
    {fetchOrdersState.isLoading === true && fetchOrdersState.isError === false && <ThreeCirclesLoader />}
    {fetchOrdersState.isLoading === false && fetchOrdersState.isError === true && <div className={styles.errorContainer}><FetchingDataError /></div>}
   </main>
  )
}
