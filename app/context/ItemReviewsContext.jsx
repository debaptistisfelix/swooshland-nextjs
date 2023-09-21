"use client"
import { useState, createContext, useEffect } from "react"


export const ItemReviewsContext = createContext();

export default function ItemReviewsContextProvider({children}) {
    return (
        <ItemReviewsContext.Provider value={{}}>
            {children}
        </ItemReviewsContext.Provider>
    )
}
