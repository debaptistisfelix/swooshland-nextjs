"use client"

import OrderBlock from '../OrderBlock/OrderBlock';
import styles from './OrderList.module.css';
import { useState, useEffect } from 'react';
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchOrders = async ()=>{
        try{
          setIsLoading(true)
            const response = await fetch('/api/order');
            const data = await response.json();
            setOrders(data);
            console.log(data)
            setIsLoading(false)
            setError(false)
        }
        catch(error){
          setIsLoading(false)
          setError(true)
          console.log(error)
        }
       
    }

    useEffect(()=>{
        fetchOrders();
    },[])


  return (
   <main className={styles.list}>
    {orders.length === 0 && isLoading === false && error === false && <h4 className={styles.noOrders}>You have no orders yet.</h4>}
    {orders.length > 0 && isLoading === false && error === false && orders.map(order => {
        return <OrderBlock key={order.id} order={order} />
    })}
    {isLoading === true && error === false && <ThreeCirclesLoader />}
   </main>
  )
}
