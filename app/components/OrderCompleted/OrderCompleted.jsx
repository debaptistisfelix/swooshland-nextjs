"use client"
import styles from './OrderCompleted.module.css'
import { poppins } from '@app/fonts'
import BackBtnWithArrow from '@app/components/Reusables/BackBtnWithArrow/BackBtnWithArrow'
import { getCookie, deleteCookie } from 'cookies-next'
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { CartContext } from '@app/context/CartContext'
import { v4 as uuidv4 } from 'uuid';
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function OrderCompleted() {
    const {cartItems, setCartItems} = useContext(CartContext)
    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
      state: false,
      msg: "",
    });
    const {id} = useParams();
  
    const getOrderDetails = async ()=>{
      setOrderId(id);
    };
  
    const confirmOrder = async ()=>{
      try{
        setLoading(true)
        const response = await fetch(`/api/order/confirm/${orderId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json();
        if(response.status === 200){
        console.log(data);
        setOrder(data);
        setCartItems([]);
        /* deleteCookie('order'); */
        setLoading(false)
        toast.success('Order confirmed successfully', {
          style: {
              backgroundColor: "#2fbf71",
              color: "#fff",
          },
          iconTheme: {
              primary: "#fff",
              secondary: "#2fbf71",
          },
      })
        } else if(response.status === 400){
        console.log(data);
        setOrder(data);
        setCartItems([]);
        /* deleteCookie('order'); */
        setLoading(false)
        toast.success('Order already confirmed', 
        {
          style: {
              backgroundColor: "#191919",
              color: "#fff",
          },
          iconTheme: {
              primary: "#fff",
              secondary: "#191919",
          },
      })
        } else if(response.status === 404){
          setLoading(false)
          toast.error('Order not found', {
            style: {
                backgroundColor: "#d00000",
                color: "#fff",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#d00000",
            },
        })
          setError({
            state: true,
            msg: "Order not found"
          })
        } 
      }
      catch(error){
        console.log(error)
        toast.error('Network Error while confirming your Order', {
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
          state:true,
          msg: "Error while confirming order"
        })}
        
    };
  
    useEffect(()=>{
      getOrderDetails()
    },[])
  
  useEffect(()=>{
  if(orderId!== null){
    confirmOrder();
  }
    },[orderId])
  
  console.log(error.msg)
  return (
   <>
    {loading === false && error.state === true && error.msg === "Order not found" && <section className="pageContent">
         <div className={styles.errorCard}>
          <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
         <h1 className={styles.title}>Error 404</h1>
         <p className={styles.parag}>
          Order not found. Please contact us for further assistance.
         </p>
         </div>
          </section>}
          {loading === false && error.state === true && error.msg === "Error while confirming order" && <section className="pageContent">
         <div className={styles.errorCard}>
         <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
         <h1 className={styles.title}>Error 500</h1>
         <p className={styles.parag}>
          There was a newtwork error while confirming your order. Please contact us for further assistance.
         </p>
         </div>
          </section>}
       {loading === true && error.state === false && <ThreeCirclesLoader /> }
       {loading === false && error.state === false && <section  className="pageContent">
          <div className={styles.card}>
            <h1 className={styles.title}>Thank you for your Order!</h1>
            <p className={styles.parag}>
            Thank you for your order!
            We are thrilled to confirm that your purchase is complete. Your satisfaction is our top priority, and we appreciate your trust in our online store. Below, you will find important information regarding your order. Please keep this information for future reference.
            </p>
           {order !== null &&  <section className={styles.details}>
                <div className={styles.detailLine}>
                    <h2 className={styles.detailLabel}>Order Nr:</h2>
                    <h2 className={styles.detailInfo}>{order?.id}</h2>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Order Date:</h2>
                <h2 className={styles.detailInfo}>{order !== null && order?.createdAt?.slice(0,10)}</h2>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Shipping Address</h2>
                <div className={styles.shippingInfo}>
                    <h2 className={styles.detailInfo}>{order?.orderAddress?.name} {order?.orderAddress?.surname}</h2>
                    <h2 className={styles.detailInfo}>{order?.orderAddress?.street}</h2>
                    <h2 className={styles.detailInfo}>{order?.orderAddress?.city} {order?.orderAddress?.zip}</h2>
                    <h2 className={styles.detailInfo}>{order?.orderAddress?.state}</h2>
                    <h2 className={styles.detailInfo}>{order?.orderAddress?.country}</h2>
                    <h2 className={styles.detailInfo}>{order?.orderAddress?.phone}</h2>
                </div>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Products details:</h2>
                <div className={styles.productsInfo}>
                  {order && order?.boughtItems?.map(product => {
                    console.log(product)
                    return  <div key={uuidv4()} className={styles.itemBox}>
                    <h2 className={styles.detailInfo}>{product?.item?.model}</h2>
                    <h2 className={styles.detailInfo}>{product?.item?.name}</h2>
                    <h2 className={styles.detailInfo}>${
                      product?.item?.discountPercentage !== 0 ? (product?.item?.price - (product?.item?.price * (product?.item?.discountPercentage / 100))).toFixed(2) : product?.item?.price.toFixed(2)
                    }</h2>
                    <h2 className={styles.detailInfo}>{product?.size !== 0 ? `EU ${product?.size}` : "OS"}</h2>
                    <h2 className={styles.detailInfo}>{product?.item?.gender === "Men" ? "MNS" : "WMNS"}</h2>
                </div>
                  })}
                    
                </div>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Subtotal</h2>
                <h2 className={styles.detailInfo}>${order?.subTotal.toFixed(2)}</h2>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Shipping</h2>
                <h2 className={styles.detailInfo}>${order?.shipping.toFixed(2)}</h2>
                </div>
                <div className={styles.detailLine}>
                <h2 className={styles.detailLabel}>Total</h2>
                <h2 className={styles.detailInfo}>${order?.total.toFixed(2)}</h2>
                </div> 
            </section>}
            <p className={styles.parag}>
            We will begin processing your order immediately. You will receive a confirmation email with tracking information once your order has been shipped. If you have any questions or need further assistance, please don't hesitate to contact our customer support team. We are always here to help.
            </p>
            <p className={styles.parag}>
            Thank you again for choosing our online store. We look forward to serving you again in the future!
            </p>
           
            <p className={styles.parag}>Swooshland Team</p>
          </div> 
        </section>}
   </>
  )
}
