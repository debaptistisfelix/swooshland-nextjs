"use client"
import { useState, useEffect } from 'react'
import styles from './FavoritesList.module.css'
import NoSizeCard from '@app/components/ItemCards/NoSizeCard/NoSizeCard'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { toast } from 'react-hot-toast'
import FetchingDataError from '@app/components/Errors/FetchingDataError/FetchingDataError'

export default function FavoritesList() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState({
        fetchingFavs: true,
        updatingFavs: false,
        isFetchError: true,
    });

    const setLoading = (key, value) => {
        setIsLoading((prevState) => ({ ...prevState, [key]: value }))
    }

    const somethingIsLoading = Object.values(isLoading).some((val) => val === true)

    const fetchFavorites = async ()=>{
        setIsLoading((prevState) => ({ ...prevState, fetchingFavs: true }))
        try{
            const response = await fetch("/api/wishlistItem");
      
            const data = await response.json();
            setFavorites(data);
 
            setIsLoading((prevState) => ({ ...prevState, fetchingFavs: false, isFetchError:false }))
        }
        catch(error){
            console.log(error)
            setIsLoading((prevState) => ({ ...prevState, fetchingFavs: false, isFetchError:true }))
        }
    }

    const removeFromFavorites = async (id) => {
        setLoading("updatingFavs", true);
        try{
            const response = await fetch(`/api/wishlistItem/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            
            if(response.status === 200){
                setFavorites((prevState)=> prevState.filter((fav)=> fav.id !== id));
                setLoading("updatingFavs", false);
                toast.success("Removed from favorites", {
                    style: {
                        backgroundColor: "#2fbf71",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#2fbf71",
                    },
                })
            }
        } catch(error){
            console.log(error);
            setLoading("updatingFavs", false);
            toast.error("Error while removing item from favorites. Retry again.", {
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
    };

    useEffect(()=>{
        fetchFavorites();
    },[])
  
  return (
    <section className={styles.listContainer}>
        <section className={styles.list}>
        {favorites !== null && favorites.length > 0 && isLoading.fetchingFavs === false && isLoading.isFetchError === false && favorites.map((fav)=>{
        return      <NoSizeCard key={fav.item.id} fav={fav} removeFromFavorites={removeFromFavorites} />
       })}
        </section>
        {somethingIsLoading === true && isLoading.isError === false && <ThreeCirclesLoader />}
        {favorites !== null && favorites.length === 0 && isLoading.fetchingFavs === false && isLoading.isError === false && <h2 className={styles.noFavs}>You have no favorites yet</h2>}
       {isLoading.isFetchError === true && isLoading.fetchingFavs === false &&  <div className={styles.errorContainer}><FetchingDataError  /></div>}
    </section>
  )
}
