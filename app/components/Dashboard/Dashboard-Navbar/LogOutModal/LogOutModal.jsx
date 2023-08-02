"use client"


import { poppins } from '@app/fonts'
import { signOut } from "next-auth/react"
import { toast } from 'react-hot-toast'

export default function LogOutModal({toggleLogOutModal, refElement}) {
  return (
    <main className={`modalContainer ${poppins.className}`}>
        <section ref={refElement} className="modal">
            <h1 className="modalTitle">Log out</h1>
            <h3 className="modalParag">Would you like to Log out?</h3>
            <div className="modalBtnBox">
                <button
                onClick={toggleLogOutModal}
                className="modalButton modalLeftButton">Cancel</button>
                <button
                 onClick={()=>{
                    signOut({callbackUrl: "/"});
                    toast.success("Logged out successfully!")
                }}
                className="modalButton modalRightButton">Log out</button>
            </div>
        </section>
    </main>
  )
}
