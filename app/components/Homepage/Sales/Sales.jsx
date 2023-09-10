
"use client"
import styles from './Sales.module.css';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import SaleCard from './SaleCard/SaleCard';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-hot-toast';


export default function Sales() {
  const salesProducts = [
    {
      title: 'Jordan 1 Mid',
      parag: 'OG Orange',
      img: '/orange5.jpg',
      oldPrice: '$289.90',
      newPrice: '$202.93',
     url: "/item/64f4c91ac1af1593c3f0325c",
     srcSet:"/_next/image?url=%2Forange5.jpg&w=640&q=75 640w, /_next/image?url=%2Forange5.jpg&w=750&q=75 750w,    /_next/image?url=%2Forange5.jpg&w=828&q=75 828w,     /_next/image?url=%2Forange5.jpg&w=1080&q=75 1080w,     /_next/image?url=%2Forange5.jpg&w=1200&q=75 1200w,     /_next/image?url=%2Forange5.jpg&w=1920&q=75 1920w,     /_next/image?url=%2Forange5.jpg&w=2048&q=75 2048w,     /_next/image?url=%2Forange5.jpg&w=3840&q=75 3840w",
     mobileSrcSet:"/_next/image?url=%2Forange5.jpg&w=640&q=75 640w,     /_next/image?url=%2Forange5.jpg&w=750&q=75 750w,     /_next/image?url=%2Forange5.jpg&w=828&q=75 828w,     /_next/image?url=%2Forange5.jpg&w=1080&q=75 1080w,     /_next/image?url=%2Forange5.jpg&w=1200&q=75 1200w,     /_next/image?url=%2Forange5.jpg&w=1920&q=75 1920w,     /_next/image?url=%2Forange5.jpg&w=2048&q=75 2048w,     /_next/image?url=%2Forange5.jpg&w=3840&q=75 3840w"
    },
    {
      title: 'Wallet Naruto',
      parag: 'Ramen Money',
      img: '/walletSteso.jpg',
      oldPrice: '$69.90',
      newPrice: '$48.93',
      url:"/item/64d757f6255966da41acf53b",
      srcSet:"/_next/image?url=%2FwalletSteso.jpg&w=640&q=75 640w,      /_next/image?url=%2FwalletSteso.jpg&w=750&q=75 750w,      /_next/image?url=%2FwalletSteso.jpg&w=828&q=75 828w,      /_next/image?url=%2FwalletSteso.jpg&w=1080&q=75 1080w,      /_next/image?url=%2FwalletSteso.jpg&w=1200&q=75 1200w,      /_next/image?url=%2FwalletSteso.jpg&w=1920&q=75 1920w,      /_next/image?url=%2FwalletSteso.jpg&w=2048&q=75 2048w,      /_next/image?url=%2FwalletSteso.jpg&w=3840&q=75 3840w",
      mobileSrcSet:"/_next/image?url=%2FwalletSteso.jpg&w=640&q=75 640w,      /_next/image?url=%2FwalletSteso.jpg&w=750&q=75 750w,      /_next/image?url=%2FwalletSteso.jpg&w=828&q=75 828w,      /_next/image?url=%2FwalletSteso.jpg&w=1080&q=75 1080w,      /_next/image?url=%2FwalletSteso.jpg&w=1200&q=75 1200w,      /_next/image?url=%2FwalletSteso.jpg&w=1920&q=75 1920w,      /_next/image?url=%2FwalletSteso.jpg&w=2048&q=75 2048w,      /_next/image?url=%2FwalletSteso.jpg&w=3840&q=75 3840w"    },
  ]

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === ''){
      toast.error("Please provide your email address", {
        style: {
          backgroundColor: "#191919",
          color: "#fff",
      },
      iconTheme: {
          primary: "#fff",
          secondary: "#191919",
      },
      })
      return;
    }
    try{
      setIsLoading(true);
      const response = await fetch('/api/newsletterSubscription', {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
      });
      const data = await response.json();
      console.log(data);
    
      if(response.status === 400){
        setIsLoading(false);
        toast.error("Email already registered in our Newsletter List", {
          style: {
            backgroundColor: "#191919",
            color: "#fff",
        },
        iconTheme: {
            primary: "#fff",
            secondary: "#191919",
        }
        })
      } else if(response.status === 200) {
        setIsLoading(false);
        toast.success("You have successfully subscribed to our newsletter!", {
          style: {
            backgroundColor: "#191919",
            color: "#fff",
        },
        iconTheme: {
            primary: "#fff",
            secondary: "#191919",
        }
        })
      }
    }
    catch(error){
      setIsLoading(false);
      console.log(error)
      toast.error("Network Error. Please try again.", {
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
  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <h2 className={styles.title}>On Sale</h2>
        <section className={styles.saleCardBox}>
        
       {salesProducts.map(product =>{
          return  <div key={uuidv4()} className={styles.cardContainer}>
          <SaleCard product={product} />
          </div>
       })}
           
        </section>
        <section className={styles.newsletterBox}>
          <h2 className={styles.letterTitle}>Newsletter</h2>
          <p className={styles.letterParag}>Subscribe to stay updated!</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input value={email} onChange={handleInputChange} className={styles.input} type="email" placeholder="Email Address" />
            <button disabled={isLoading === true} type="submit" className={styles.submitBtn}>
             {isLoading === true ? <div className={styles.loader}></div> :  <FontAwesomeIcon icon={faEnvelopeCircleCheck} className={styles.letterIcon} />}
            </button>
          </form>
        </section>
    </main>
  )
}
