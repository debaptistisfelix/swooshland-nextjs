"use client"
import styles from './page.module.css'
import { poppins } from '@app/fonts'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import { useParams } from 'next/navigation'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'


export default function page() {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    state: false,
    msg: "",
  })
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const getOrderDetails = async ()=>{
    setOrderId(id);
  };

  const fetchOrder = async ()=>{
    try {
      setLoading(true)
      const response = await fetch(`/api/order/failed/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setOrder(data);
      setLoading(false)
      setError({
        state: false,
        msg: "",  
      })
    } catch (error) {
      console.log(error);
      setLoading(false)
      setError({
        state: true,
        msg: "Network Error",  
      })
    }
  };

  useEffect(()=>{
    getOrderDetails();
  }, [])

  useEffect(()=>{
    if(orderId !== null){
      fetchOrder();
    }
  },[orderId])


  return (
    <main className={`pageContainer  ${poppins.className}`}>
        <BackBtnWithArrow path="/" text="Back to Shop" />
        <section  className="pageContent">
          {loading === true && <ThreeCirclesLoader />}
          {loading === false && error.state === false && <div className={styles.card}>
            <h1 className={styles.title}>There was an ERROR with your Order!</h1>
            
            <p className={styles.parag}><b>Order Nr: {order !== null && order.id}</b></p>
            <p className={styles.parag}>
            We apologize for the inconvinience!
            </p>
            <p className={styles.parag}>
            We regret to inform you that there was an error processing your order. We understand that this may be disappointing, and we sincerely apologize for any inconvenience caused. Our team is actively working to resolve the issue, and we appreciate your patience..
            </p>
            <p className={styles.parag}>
            If you have been charged for the order, contacts us with your order Nr and rest assured that we will promptly initiate a refund. You should see the refunded amount reflected in your account within 24/48 hours.
            </p>
            <p className={styles.parag}>
            Once again, we sincerely apologize for any inconvenience caused. We value your business and appreciate your understanding. Our team is committed to ensuring a seamless shopping experience, and we will make every effort to rectify this situation promptly.
            </p>
            <p className={styles.parag}>Thank you again for your understanding and patiance.</p>
            <p className={styles.parag}>Swooshland Team</p>
          </div>

          }
        </section>
    </main>
  )
}
