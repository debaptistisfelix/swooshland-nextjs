"use client"

import styles from './ReviewSection.module.css';
import { poppins } from '@app/fonts';
import ReviewBlock from './ReviewBlock/ReviewBlock';
import ReviewOverview from './ReviewOverview/ReviewOverview';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from '@app/components/Reusables/CustomSelect/CustomSelect';
import { useSession } from 'next-auth/react';
import ThreeCirclesLoader from '@app/components/Reusables/ThreeCirclesLoader/ThreeCirclesLoader';
import { toast } from 'react-hot-toast';

export default function ReviewSection({item, setLoading, isLoading}) {
    const [colOne, setColOne] = useState([])
    const [colTwo, setColTwo] = useState([])
    const reviewsPerPage = 4;
    const [visibleReviews, setVisibleReviews] = useState([])
    const [selectedSorting, setSelectedSorting] = useState("Sort by");
    const [selectedFilter, setSelectedFilter] = useState("Filter by");
    const {reviews} = item;
    const [itemReviews, setItemReviews] = useState(reviews)
    const {data: session} = useSession();
  

    useEffect(() => {
      // Show the first 4 newest reviews
       setVisibleReviews(itemReviews.slice(0, reviewsPerPage))
       //Arrange them in 2 columns
         arrangeReviewsColumns()
    }, [itemReviews])

   useEffect(()=>{
    const applySorting = () => {
        if(selectedSorting === "Newest") {
            const sortedReviews = visibleReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            console.log(sortedReviews)
            setVisibleReviews(sortedReviews)
            arrangeReviewsColumns()
        } else if(selectedSorting === "Oldest") {
            const sortedReviews = visibleReviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            setVisibleReviews(sortedReviews)
            console.log(sortedReviews)
            arrangeReviewsColumns()
        } else if(selectedSorting === "Highest Rating") {
            const sortedReviews = visibleReviews.sort((a, b) => b.rating - a.rating)
            setVisibleReviews(sortedReviews)
            console.log(sortedReviews)
            arrangeReviewsColumns()
        } else if(selectedSorting === "Lowest Rating") {
            const sortedReviews = visibleReviews.sort((a, b) => a.rating - b.rating)
            setVisibleReviews(sortedReviews)
            console.log(sortedReviews)
            arrangeReviewsColumns()
        }
    }
   
    applySorting();
   }, [selectedSorting, visibleReviews])

   useEffect(()=>{
    const applyFilter = () => {
      const nextPageIndex = visibleReviews.length + reviewsPerPage;
      if(selectedFilter === "No Filter" || selectedFilter === "Filter by") {
          setVisibleReviews(itemReviews.slice(0, reviewsPerPage))
          arrangeReviewsColumns()
      } else if(selectedFilter === "5 Stars") {
          const filteredReviews = itemReviews.filter(review => review.rating === 5).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      } else if(selectedFilter === "4 Stars") {
          const filteredReviews = itemReviews.filter(review => review.rating === 4).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      } else if(selectedFilter === "3 Stars") {
          const filteredReviews = itemReviews.filter(review => review.rating === 3).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      } else if(selectedFilter === "2 Stars") {
          const filteredReviews = itemReviews.filter(review => review.rating === 2).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      } else if(selectedFilter === "1 Star") {
          const filteredReviews = itemReviews.filter(review => review.rating === 1).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      }
  }
  applyFilter();
   }, [selectedFilter])

    

    const handleSortChange = (sortFilter) =>{
        setSelectedSorting(sortFilter)
    }

    const handleFilterChange = (sortFilter) =>{
        setSelectedFilter(sortFilter)
      
    }

    const handleLoadMore = () => {
        const nextPageIndex = visibleReviews.length + reviewsPerPage;
    
       if(selectedFilter === "Filter by" || selectedFilter === "No Filter") {
        const nextReviews = itemReviews.slice(0, nextPageIndex);
        setVisibleReviews(nextReviews);
       
        console.log(visibleReviews)
       } else {
        const nextReviews = itemReviews.filter(review => review.rating === parseInt(selectedFilter[0])).slice(0, nextPageIndex);
        setVisibleReviews(nextReviews);
       }
    }

   

    useEffect(() => {
      // everytime the visible reviews change, arrange them in 2 columns
        arrangeReviewsColumns()
    }, [visibleReviews])


    const deleteReview = async (itemId, reviewId, userId,) => {
        if(session && session.id === userId){
         try{
        setLoading("updatingReviews", true)
           const response = await fetch(`/api/review/${itemId}/${reviewId}`, {
             method: 'DELETE',
           })
           const data = await response.json();
           setItemReviews((prevState) => prevState.filter(review => review.id !== reviewId))
           setLoading("updatingReviews", false)
            toast.success("Review deleted",  {
                style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
            })
         } catch(error){
             console.log(error);
             setLoading("updatingReviews", false)
             toast.error("Error while deleting review", {
                style: {
                    backgroundColor: "#191919",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#fff",
                    secondary: "#191919",
                },
            }  )
         }
        }
     };

    const arrangeReviewsColumns = () => {
        let col1 = []
        let col2 = []
        //Loop over the visible reviews and push them into the columns based on their index
        for(let i = 0; i < visibleReviews.length; i++) {
            if(i % 2 === 0) {
                col1.push(visibleReviews[i])
            } else {
                col2.push(visibleReviews[i])
            }
        }
        //Set the columns using the state
        setColOne(col1)
        setColTwo(col2)
    }
   
   

      const selectOptions = {
        title: "Sort by",
        options: [
            "Newest",
            "Oldest",
            "Highest Rating",
            "Lowest Rating"
        ]
    }

   

    const filterOptions = {
      title: "Specific Star Rating",
      options: [
        "No Filter",
          "5 Stars",
          "4 Stars",
          "3 Stars",
          "2 Stars",
          "1 Star"
      ]
    }

 
      
const noFiltersWereApplied = selectedFilter === "No Filter" || selectedFilter === "Filter by";
const appliedFilters = selectedFilter !== "No Filter" || selectedFilter !== "Filter by";

  return (
    <main className={`${styles.section} ${poppins.className}`}>
        <section className={styles.ratingScoreBox}>
            <h1 className={styles.ratingTitle}>Rating</h1>
            <ReviewOverview item={item} itemReviews={itemReviews} />
            <div className={styles.sortBox}>
            <CustomSelect position="bottom" selectOptions={selectOptions} handleOptionChange={handleSortChange} selectedOption={selectedSorting} />
            <CustomSelect position="bottom" selectOptions={filterOptions} selectedOption={selectedFilter} handleOptionChange={handleFilterChange} />
            </div>
          
            
        </section>
        <section className={styles.reviewsBox}>
        <h1 className={styles.reviewTitle}>Reviews</h1>
        {visibleReviews.length > 0 ? <><div className={styles.mobileList}>
        {visibleReviews.map(review =>{
            return <ReviewBlock deleteReview={deleteReview} review={review} key={uuidv4()} />
        })}
        </div></> :  <p className={`${styles.noReviews} ${styles.mobileLoading}`}>0 reviews.</p>}
       {visibleReviews.length > 0 ? <>
        <section className={styles.list}>
           <section className={styles.reviewColumn}>
            {colOne.map((review, i)=>{
                return <ReviewBlock deleteReview={deleteReview} review={review} key={uuidv4()} />
            })}
           </section>
           <section className={styles.reviewColumn}>
            {colTwo.map((review, i)=>{
                return <ReviewBlock deleteReview={deleteReview} review={review} key={uuidv4()} />
            })}
           </section>
          
        </section>
        {visibleReviews.length < itemReviews.length  && noFiltersWereApplied && <button onClick={handleLoadMore} className={styles.btn}>Load more</button>}
        {visibleReviews.length <  itemReviews.filter(review => review.rating === parseInt(selectedFilter[0])).length && appliedFilters  && <button onClick={handleLoadMore} className={styles.btn}>Load more</button>}
       </>  : <p className={`${styles.noReviews} ${styles.desktopLoading}`}>0 reviews.</p>}
      
        </section>
        {isLoading.updatingReviews === true && <ThreeCirclesLoader />}
    </main>
  )
}
