"use client"

import OrderBlock from '../OrderBlock/OrderBlock';
import styles from './OrderList.module.css';
import { useState } from 'react';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
  return (
   <main className={styles.list}>
  {/*   {orders.length === 0 && <h4 className={styles.noOrders}>You have no orders yet.</h4>}
    {orders.length > 0 && orders.map(order => {
        return <OrderBlock key={order.id} order={order} />
    })} */}
    <OrderBlock />
    <OrderBlock />
    <OrderBlock />
    <OrderBlock />
    <OrderBlock />
    <OrderBlock />
    <OrderBlock />  <OrderBlock />
    <OrderBlock />
    <OrderBlock />
    <OrderBlock />
   </main>
  )
}
