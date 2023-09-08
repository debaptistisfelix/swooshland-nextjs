"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { poppins } from "@app/fonts"

export default function FetchingDataError({error}) {
  console.log(error)
    const reset = () => window.location.reload()
  return (
    <main className={`errorContainer ${poppins.className}`}>
    <FontAwesomeIcon icon={faCircleExclamation} className="errorIcon" />
    <h1 className="errorTitle">Error 404</h1>
    <p className="errorParag">An error occurred while fetching Data from the Server.</p>
    <button onClick={reset} className="errorBtn">Try again</button>
  </main>
  )
}
