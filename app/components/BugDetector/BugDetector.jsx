"use client"

import styles from "./BugDetector.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBug, faX, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { poppins } from "@app/fonts"


export default function BugDetector() {
    const [showingForm, setShowingForm] = useState(null)
   
    const [path, setPath] = useState(null)
    const [data, setData] = useState({
        name: "",
        description: "",
    })



    const handleOnInputChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]: value})
    };

    useEffect(() => {
        if(showingForm === true) {
            document.body.style.overflow = "hidden";
            setPath(window.location.pathname)
        } else {
            document.body.style.overflow = "unset"
        }
    }, [showingForm])





    const toggleForm = () => setShowingForm(!showingForm)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.name === "" || data.description === "") {
            toast.error("Please fill out all fields before submitting", {
                style: {
                    backgroundColor: "#d00000",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#d00000",
                },
            })
            return
        } else {
            try{
               fetch("/api/bugDetector", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...data, path: path}),
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if(data.message === "success") {
                        toast.success("Thank you for your feedback!", {
                            style: {
                                backgroundColor: "#ff6000",
                                color: "#fff",
                            },
                            iconTheme: {
                                primary: "#fff",
                                secondary: "#ff6000",
                            },
                        })
                       
                        setData({
                            name: "",
                            description: "",
                            path: path
                        })
                        setTimeout(() => {
                            setShowingForm(false)
                        }, 1000)
                    } else {
                        toast.error("Network Error while submitting your feedback. Retry in a few minutes.", {
                            style: {
                                backgroundColor: "#d00000",
                                color: "#fff",
                            },
                            iconTheme: {
                                primary: "#fff",
                                secondary: "#d00000",
                            },
                        })
                    }
                }) 
            }catch(error){
                console.log(error)
                toast.error("Network Error while submitting your feedback. Retry in a few minutes.", {
                    style: {
                        backgroundColor: "#d00000",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#d00000",
                    },
                })
            }
        }
       
    }

  return (
    <>
    <main onClick={toggleForm} className={styles.bugDetectorContainer}>
        <div className={styles.whiteCircle}>
            <FontAwesomeIcon  icon={showingForm === true ? faX : faBug } className={styles.bugIcon} />
        </div>
    </main>
   {showingForm === true &&  <section className={styles.shader}>
    </section>}
    <section className={`${poppins.className} ${styles.bugDetectorForm} ${showingForm === true && styles.active} ${showingForm === false && styles.notActive}`}>
    <h1 className={styles.title}>
        BUG 
       
        DETECT <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.magnifyingGlass} />R
    </h1>
    <p className={styles.intro}>
    "Welcome to the Bug Detector! This form allows visitors to notify me if they encounter any bugs or issues while browsing through my portfolio websites. Your feedback is invaluable in helping me improve the functionality and user experience. Please feel free to report any problems you come across, and I'll address them promptly. Thank you for your assistance!"
    </p>
    <form onSubmit={handleSubmit} className={styles.form}>
        <input onChange={handleOnInputChange} value={data.name} name="name" type="text" placeholder="Your Name" className={styles.input} />
        <textarea onChange={handleOnInputChange} value={data.description} name="description" type="text" placeholder={`On this path (${path}) I found this error/bug: `} className={styles.textArea} />
        
        <button  type="submit" className={styles.btn}>POST</button>
    </form>
    </section>
    </>
  )
}
