"use client"
import styles from './OrderFailed.module.css'
import { useParams } from 'next/navigation'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'


export default function OrderFailed() {
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
        toast.error("Order Confirmation Failed", {
            style: {
                backgroundColor: "#d00000",
                color: "#fff",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#d00000",
            },
        })
        if(response.status === 404){
            toast.error("Order not Found", {
                style: {
                    backgroundColor: "#d00000",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#d00000",
                },
            })
            setLoading(false)
            setError({
              state: true,
              msg: "Order not found",  
            })
        }
      } catch (error) {
        console.log(error);
        toast.error("Order not found", {
            style: {
                backgroundColor: "#d00000",
                color: "#fff",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#d00000",
            },
        })
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
    {loading === false &&  error.msg === "Order not found" && <section className="pageContent">
         <div className={styles.NotFoundCard}>
          <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
         <h1 className={styles.title}>Error 404</h1>
         <p className={styles.parag}>
          Order not found. Please contact us for further assistance.
         </p>
         </div>
          </section>}
  </section>
  )
}
