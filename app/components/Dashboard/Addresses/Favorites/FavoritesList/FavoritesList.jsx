"use client"
import { useState, useEffect } from 'react'
import styles from './FavoritesList.module.css'
import NoSizeCard from '@app/components/ItemCards/NoSizeCard/NoSizeCard'
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader'
import { toast } from 'react-hot-toast'

export default function FavoritesList() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState({
        fetchingFavs: true,
        updatingFavs: false,
    });

    const setLoading = (key, value) => {
        setIsLoading((prevState) => ({ ...prevState, [key]: value }))
    }

    const somethingIsLoading = Object.values(isLoading).some((val) => val === true)

    const fetchFavorites = async ()=>{
        setLoading("fetchingFavs", true);
        try{
            const response = await fetch("/api/wishlistItem");
            const data = await response.json();
            setFavorites(data);
            console.log(data)
            setLoading("fetchingFavs", false);
        }
        catch(error){
            console.log(error)
            setLoading("fetchingFavs", false);
        }
    }

    const removeFromFavorites = async (id) => {
        setLoading("updatingFavs", true);
        try{
            const response = await fetch(`/api/wishlistItem/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            console.log(data);
            if(response.status === 200){
                setFavorites((prevState)=> prevState.filter((fav)=> fav.id !== id));
                setLoading("updatingFavs", false);
                toast.success("Removed from favorites", {
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
        } catch(error){
            console.log(error);
            setLoading("updatingFavs", false);
            toast.error("Error while removing item from favorites. Retry again.", {
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
    };

    useEffect(()=>{
        fetchFavorites();
    },[])
  
  return (
    <section className={styles.listContainer}>
        <section className={styles.list}>
        {favorites.length > 0 && isLoading.fetchingFavs === false && favorites.map((fav)=>{
        return      <NoSizeCard key={fav.item.id} fav={fav} removeFromFavorites={removeFromFavorites} />
       })}
        </section>
        {somethingIsLoading === true && <ThreeCirclesLoader />}
        {favorites.length === 0 && isLoading.fetchingFavs === false && <h2 className={styles.noFavs}>You have no favorites yet</h2>}
    </section>
  )
}
