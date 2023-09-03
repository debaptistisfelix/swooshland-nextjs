"use client"

import styles from './page.module.css'
import Image from 'next/image'
import { poppins } from '@app/fonts'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import {  useSession } from 'next-auth/react'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import NotSubscribedForm from '@app/components/Dashboard/NewsletterPage/NotSubscribed/NotSubscribedForm'
import SubscribedForm from '@app/components/Dashboard/NewsletterPage/Subscribed/SubscribedForm'

export default function NewsletterPage() {
  const [subscribed, setSubscribed] = useState(null)
  const [isLoading, setIsLoading] = useState({
    checkingSubscribed: true,
    submittingSubscribtion: false
  })
  const session = useSession()

  console.log(subscribed)

  const somethingIsLoading = Object.values(isLoading).some((item)=> item === true )

  const checkIfUserIsSUbscribedToNewsletter = async () => {
    if(session.status === "authenticated"){
      try{
        setIsLoading({...isLoading, checkingSubscribed: true})
        const response = await fetch(`/api/user/${session.data.id}`, {
          method: "GET",
        })
  
        if(response.ok){
          const data = await response.json()
          console.log("data form response ",data)
         setSubscribed(data)
         setIsLoading({...isLoading, checkingSubscribed: false})
        }
      } catch(err){
        console.log(err)
        setIsLoading({...isLoading, checkingSubscribed: false})
      }
    }

  }

  const updateSubscriptionToNewsLetter = async () => {
    event.preventDefault();
    try{
      setIsLoading({...isLoading, submittingSubscribtion: true})
      const response = await fetch(`/api/newsletter/${session.data.id}`, {
        method:"PATCH",
      })
      if(response.ok){
        const data = await response.json();
        setSubscribed(data);
        setIsLoading({...isLoading, submittingSubscribtion: false})
        if(data === true){
          toast.success("You have successfully subscribed to our newsletter", {
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
          toast.success("You have successfully unsubscribed from our newsletter", {
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
    } catch(error){
      console.log(error)
      setIsLoading({...isLoading, submittingSubscribtion: false})
      toast.error("Something went wrong, please try again later", {
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

  useEffect(() => {
    checkIfUserIsSUbscribedToNewsletter();
  },[session, subscribed])


  return (
    <main className={`${styles.newsletterPage} ${poppins.className}`}>
        <div className={styles.imageBox}>
            <div className={styles.shader}>    </div>
            <div className={styles.bannerTextBox}>
                <h2 className={styles.bannerTitle}>Newsletter Subscription</h2>
                <p className={styles.bannerSubtitle}>Sneak Peeks to always stay updated on the newest kickz</p>
            </div>
            <Image
            style={{objectFit: "cover"}}
            className={styles.image} src="/banner-images/fabiPoster.jpg" fill="true" alt="poster-with-model" />
        </div>
        {subscribed === true && !somethingIsLoading && <SubscribedForm updateSubscriptionToNewsLetter={updateSubscriptionToNewsLetter} /> }
        {subscribed === false && !somethingIsLoading && <NotSubscribedForm updateSubscriptionToNewsLetter={updateSubscriptionToNewsLetter} />}
        {somethingIsLoading && <ThreeCirclesLoader />}
    </main>
  )
}
