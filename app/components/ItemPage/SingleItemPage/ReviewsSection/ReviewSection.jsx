"use client"

import styles from './ReviewSection.module.css';
import { poppins } from '@app/fonts';
import ReviewBlock from './ReviewBlock/ReviewBlock';
import ReviewOverview from './ReviewOverview/ReviewOverview';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from '@app/components/Reusables/CustomSelect/CustomSelect';

export default function ReviewSection() {
    const [colOne, setColOne] = useState([])
    const [colTwo, setColTwo] = useState([])
    const reviewsPerPage = 4;
    const [visibleReviews, setVisibleReviews] = useState([])
    const [selectedSorting, setSelectedSorting] = useState("Sort by");
    const [selectedFilter, setSelectedFilter] = useState("Filter by");


    useEffect(() => {
      // Show the first 4 newest reviews
       setVisibleReviews(fakeReviews.slice(0, reviewsPerPage))
       //Arrange them in 2 columns
         arrangeReviewsColumns()
    }, [])

   useEffect(()=>{
    const applySorting = () => {
        if(selectedSorting === "Newest") {
            const sortedReviews = visibleReviews.sort((a, b) => new Date(b.date) - new Date(a.date))
            console.log(sortedReviews)
            setVisibleReviews(sortedReviews)
            arrangeReviewsColumns()
        } else if(selectedSorting === "Oldest") {
            const sortedReviews = visibleReviews.sort((a, b) => new Date(a.date) - new Date(b.date))
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
          setVisibleReviews(fakeReviews.slice(0, reviewsPerPage))
          arrangeReviewsColumns()
      } else if(selectedFilter === "5 Stars") {
          const filteredReviews = fakeReviews.filter(review => review.rating === 5).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      } else if(selectedFilter === "4 Stars") {
          const filteredReviews = fakeReviews.filter(review => review.rating === 4).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      } else if(selectedFilter === "3 Stars") {
          const filteredReviews = fakeReviews.filter(review => review.rating === 3).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      } else if(selectedFilter === "2 Stars") {
          const filteredReviews = fakeReviews.filter(review => review.rating === 2).slice(0, reviewsPerPage);
          setVisibleReviews(filteredReviews)
          arrangeReviewsColumns()
      } else if(selectedFilter === "1 Star") {
          const filteredReviews = fakeReviews.filter(review => review.rating === 1).slice(0, reviewsPerPage);
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
        const nextReviews = fakeReviews.slice(0, nextPageIndex);
        setVisibleReviews(nextReviews);
       
        console.log(visibleReviews)
       } else {
        const nextReviews = fakeReviews.filter(review => review.rating === parseInt(selectedFilter[0])).slice(0, nextPageIndex);
        setVisibleReviews(nextReviews);
       }
    }

   

    useEffect(() => {
      // everytime the visible reviews change, arrange them in 2 columns
        arrangeReviewsColumns()
    }, [visibleReviews])

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
   
    const fakeReviews = [
        {
          username: "SneakerLover99",
          title: "My New Favorites!",
          reviewBody: "These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere!",
          date: "2023-07-12",
          rating: 5,
        },
        {
          username: "SneakerJohn",
          title: "My New To go sneakers!",
          reviewBody: "These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere!",
          date: "2023-07-14",
          rating: 3,
        },
        {
          username: "RunningManiac",
          title: "Best Running Shoes Ever",
          reviewBody: "I've tried many running shoes, but these are by far the best. Excellent support and cushioning.",
          date: "2023-07-08",
          rating: 4,
        },
        {
          username: "Fashionista123",
          title: "Highly Recommended",
          reviewBody: "The design of these sneakers is on point. They elevate any outfit.",
          date: "2023-07-02",
          rating: 5,
        },
        {
          username: "FitnessGuru87",
          title: "Perfect for the Gym",
          reviewBody: "These sneakers provide great stability during workouts. Very happy with my purchase. These sneakers provide great stability during workouts. Very happy with my purchase. These sneakers provide great stability during workouts. Very happy with my purchase. These sneakers provide great stability during workouts. Very happy with my purchase.",
          date: "2023-06-28",
          rating: 4,
        },
        {
          username: "ColorfulKicks",
          title: "Vibrant and Fun",
          reviewBody: "I love the vibrant colors of these sneakers. They brighten up my day! These sneakers can be dressed up or down. They are my go-to footwear for any occasion.These sneakers can be dressed up or down. They are my go-to footwear for any occasion.These sneakers can be dressed up or down. They are my go-to footwear for any occasion.These sneakers can be dressed up or down. They are my go-to footwear for any occasion.These sneakers can be dressed up or down. They are my go-to footwear for any occasion.",
          date: "2023-06-22",
          rating: 5,
        },
        {
          username: "WalksWithStyle",
          title: "Compliments Galore",
          reviewBody: "I get compliments every time I wear these. They are a real head-turner. I get compliments every time I wear these. They are a real head-turner.",
          date: "2023-06-18",
          rating: 4,
        },
        {
          username: "SneakerHead",
          title: "My worst haul",
          reviewBody: "These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere!",
          date: "2023-07-01",
          rating: 1,
        },
        {
          username: "ClassicSneakerFan",
          title: "Timeless Design",
          reviewBody: "The classic design of these sneakers makes them a must-have for any sneaker enthusiast.",
          date: "2023-06-14",
          rating: 5,
        },
        {
          username: "AthleticChic",
          title: "Versatile and Trendy",
          reviewBody: "These sneakers can be dressed up or down. They are my go-to footwear for any occasion.",
          date: "2023-06-10",
          rating: 4,
        },
        {
          username: "UrbanExplorer",
          title: "Durable and Stylish",
          reviewBody: "I've been wearing these sneakers daily, and they still look as good as new. ",
          date: "2023-06-06",
          rating: 5,
        },
        {
          username: "TrendyTreads",
          title: "On-Trend and Comfy",
          reviewBody: "I'm impressed with how comfortable and trendy these sneakers are.",
          date: "2023-06-02",
          rating: 4,
        },
        {
          username: "UrbanExplorer95",
          title: "Durable and Stylish? WHERE?!?!",
          reviewBody: "I've been wearing these sneakers daily, and they still look as good as new. ",
          date: "2023-06-01",
          rating: 2,
        },
        {
          username: "SneakerHead1",
          title: "A Collector's Dream",
          reviewBody: "As a sneaker collector, these limited edition kicks are a valuable addition to my collection.",
          date: "2023-05-28",
          rating: 5,
        },
        {
          username: "HappyFeet23",
          title: "Happy Feet Indeed",
          reviewBody: "My feet are happy in these sneakers! No more discomfort during long walks.",
          date: "2023-05-24",
          rating: 4,
        },
        {
          username: "SneakerLover99",
          title: "My New Favorites!",
          reviewBody: "These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere!",
          date: "2023-07-12",
          rating: 5,
        },
        {
          username: "AdventureBound",
          title: "Ready for Adventures",
          reviewBody: "I took these sneakers on a hiking trip, and they held up exceptionally well.",
          date: "2023-05-20",
          rating: 5,
        },
        {
          username: "SneakerEnthusiast",
          title: "Impressive Quality",
          reviewBody: "The build quality of these sneakers is impressive. They will last for a long time.",
          date: "2023-05-16",
          rating: 4,
        },
        {
          username: "CityStroller",
          title: "Great for Urban Life",
          reviewBody: "Navigating the city streets is a breeze with these comfortable and stylish sneakers.",
          date: "2023-05-12",
          rating: 5,
        },
        {
          username: "SneakerLover99",
          title: "My New Favorites!",
          reviewBody: "These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere!",
          date: "2023-07-12",
          rating: 5,
        },
        {
          username: "FitnessFreak",
          title: "Supportive Workout Partner",
          reviewBody: "During intense workouts, these sneakers provide the support my feet need.",
          date: "2023-05-08",
          rating: 4,
        },
        {
          username: "SneakerGal",
          title: "Unique and Eye-Catching",
          reviewBody: "I love how unique and eye-catching these sneakers are. They're a conversation starter.",
          date: "2023-05-04",
          rating: 5,
        },
        {
          username: "SneakerLover99",
          title: "My New Favorites!",
          reviewBody: "These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere!",
          date: "2023-07-12",
          rating: 5,
        },
        {
          username: "WalkingWonder",
          title: "Made for Walking",
          reviewBody: "If you love walking, these sneakers are a dream come true. My feet thank me!",
          date: "2023-04-30",
          rating: 4,
        },
        {
          username: "SneakerLover99",
          title: "My New Favorites!",
          reviewBody: "These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere!",
          date: "2023-07-12",
          rating: 5,
        },
        {
          username: "FashionForward",
          title: "Fashion-Forward Footwear",
          reviewBody: "Stay ahead in the fashion game with these trendy and comfortable sneakers.",
          date: "2023-04-26",
          rating: 5,
        },
        {
          username: "CasualCool",
          title: "Casual Coolness",
          reviewBody: "With these sneakers, I effortlessly achieve a cool and casual look.",
          date: "2023-04-22",
          rating: 4,
        },
        {
          username: "ActiveLifestyle",
          title: "Perfect for an Active Lifestyle",
          reviewBody: "These sneakers keep up with my active lifestyle, providing the comfort I need.",
          date: "2023-04-18",
          rating: 5,
        },
        {
          username: "SneakerLover99",
          title: "My New Favorites!",
          reviewBody: "These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere! These sneakers are incredibly comfortable and stylish. I wear them everywhere!",
          date: "2023-07-12",
          rating: 5,
        },
      ];

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
            <ReviewOverview />
            <div className={styles.sortBox}>
            <CustomSelect position="bottom" selectOptions={selectOptions} handleOptionChange={handleSortChange} selectedOption={selectedSorting} />
            <CustomSelect position="bottom" selectOptions={filterOptions} selectedOption={selectedFilter} handleOptionChange={handleFilterChange} />
            </div>
          
            
        </section>
        <section className={styles.reviewsBox}>
        <h1 className={styles.reviewTitle}>Reviews</h1>
        {visibleReviews.length > 0 ? <><div className={styles.mobileList}>
        {visibleReviews.map(review =>{
            return <ReviewBlock review={review} key={uuidv4()} />
        })}
        </div></> :  <p className={`${styles.loadingReviews} ${styles.mobileLoading}`}>0 reviews</p>}
       {visibleReviews.length > 0 ? <>
        <section className={styles.list}>
           <section className={styles.reviewColumn}>
            {colOne.map((review, i)=>{
                return <ReviewBlock review={review} key={uuidv4()} />
            })}
           </section>
           <section className={styles.reviewColumn}>
            {colTwo.map((review, i)=>{
                return <ReviewBlock review={review} key={uuidv4()} />
            })}
           </section>
          
        </section>
        {visibleReviews.length < fakeReviews.length  && noFiltersWereApplied && <button onClick={handleLoadMore} className={styles.btn}>Load more</button>}
        {visibleReviews.length <  fakeReviews.filter(review => review.rating === parseInt(selectedFilter[0])).length && appliedFilters  && <button onClick={handleLoadMore} className={styles.btn}>Load more</button>}
       </>  : <p className={`${styles.loadingReviews} ${styles.desktopLoading}`}>0 reviews</p>}
      
        </section>
    </main>
  )
}
