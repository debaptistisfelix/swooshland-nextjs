"use client"

import { useState } from 'react';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NavbarSearch.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import SearchCard from '@app/components/ItemCards/SearchCard/SearchCard';
import Image from 'next/image';
import NavSearchLoader from './NavSearchLoader/NavSearchLoader';
import KawaiiPoster from './Advertising/KawaiiAdvertising/KawaiiPoster';
import DiorPoster from './Advertising/DiorAdvertising/DiorPoster';
import LeoPoster from './Advertising/LeoAdvertising/LeoPoster';
import KrakenPoster from './Advertising/KrakenAdvertising/KrakenPoster';
import OrangePoster from './Advertising/OrangeAdvertising/OrangePoster';
import KawaiiPosterImg from '@/public/PosterLeoKawaii.jpg';
import LeopardPosterImg from '@/public/PosterLeo.jpg';
import KrakenPosterImg from '@/public/banner-images/fabioPoster.jpg';
import DiorPosterImg from '@/public/PosterDior.jpg';
import OrangePosterImg from '@/public/PosterOgOrange.jpg';


export default function NavbarSearch({isSearchOpen}) {
    const [openSearch, setOpenSearch] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [randomImage, setRandomImage] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultsCount, setSearchResultsCount] = useState(null);
    const [isLoadingResults, setIsLoadingResults] = useState(true);
    const refElement = useRef(null);
    const inputRef = useRef(null);

    const openSearchBox = () => {
        setOpenSearch(true);
    }

    const closeSearchBox = () => {
        setOpenSearch(false);
        setSearchQuery('');
        setSearchResults([]);
        setSearchResultsCount(null);
    }


    useEffect(() => {
      // Logic to handle if a user clicks outside the searchComponent and to close it
      const handleClickOutside = (e) => {
          if(refElement.current && !refElement.current.contains(e.target) && inputRef.current && !inputRef.current.contains(e.target)){
            setOpenSearch(false);
            setSearchQuery("");
            setSearchResults([]);
          }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      }
  }, [])

    useEffect(() => {
      //Loginc to make the page not scrollable when the searchComponent is open
      /* if(openSearch === true && searchQuery !== ""){
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'visible';
      } */

      // Keep Input focused when SearchComponent is open
      if(openSearch === true){
        inputRef.current.focus();
      }

      // clean up search results count when the query is empty again
      if(searchQuery === ""){
        setSearchResultsCount(null);
      }
    }, [openSearch, searchQuery]);

    useEffect(() => {
      const checkWindowWidth = () => {
        if(window.innerWidth < 1024){
          setOpenSearch(null);
        }
      }

      checkWindowWidth();

      window.addEventListener('resize', checkWindowWidth);

      return () => {
        window.removeEventListener('resize', checkWindowWidth);
      }

    }, []);

    useEffect(()=>{
      if(openSearch === true){
        const randomIndex = Math.floor(Math.random() * posterImages.length);
        const randomImgToDisplay = posterImages[randomIndex];
        setRandomImage(randomImgToDisplay);
      }

    }, [openSearch])

    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    }

    const fetchSearchResults = async () => {
      setIsLoadingResults(true);
      try {
        const response = await fetch(`/api/item?query=${searchQuery}`);
        const data = await response.json();
        console.log(data);
        const alphabeticOrderedList = data.sort((a, b) => {
          if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
          }
          if(a.name.toLowerCase() > b.name.toLowerCase()){
            return 1;
          }
          return 0;
        })
        setSearchResults(alphabeticOrderedList);
        setSearchResultsCount(data.length);
        setIsLoadingResults(false);
      } catch (error) {
        console.log(error);
        setIsLoadingResults(false);
      }
    };

    useEffect(() => {
      if(searchQuery.trim() === ""){
        setSearchResults([]);
      }


      const delayTimer = setTimeout(() => {
        if(searchQuery.trim() !== ""){
          fetchSearchResults();
        }
      }, 500);

      return () => clearTimeout(delayTimer);
    },[searchQuery])

   


    const posterImages = [
      {
        id: 1,
        src: KawaiiPosterImg,
        alt: "Poster-leo-kawaii",
        href:"/item/64f5995e2c7ea59ac36818e5"
      },
      {
        id: 2,
        src: OrangePosterImg,
        alt: "Poster-Og-Orange",
        href:"/item/64f4c91ac1af1593c3f0325c"
      },
      {
        id: 3,
        src: KrakenPosterImg,
        alt: "Poster-Nike-af1-kraken",
        href:"/item/64f590312c7ea59ac3681832"
      },
      {
        id: 4,
        src: DiorPosterImg,
        alt: "Poster-Dior",
        href:"/item/64f4c431c1af1593c3f0323f"
      },
      {
        id: 5,
        src: LeopardPosterImg,
        alt: "Poster-leo",
        href:"/item/64f598332c7ea59ac36818d6"
      }

    ]

    

  return (
    <>
    <div className={`${styles.searchBox} ${openSearch === true && styles.active} ${openSearch === false && styles.notActive}`}>
            <FontAwesomeIcon
            onClick={openSearchBox}
            icon={faMagnifyingGlass} className={styles.icon} />
            {openSearch === true && <input ref={inputRef} onChange={handleInputChange} type="text" placeholder="Search" className={`${styles.searchInput}  ${poppins.className}`} />}
            {openSearch === true && <FontAwesomeIcon icon={faX} className={`${styles.icon} ${openSearch === true && styles.active} ${styles.closeIcon}`} onClick={()=>{
              closeSearchBox();
            }} />}
    </div>
    {openSearch === true && searchQuery !== "" && <section  className={`${styles.searchResults} ${poppins.className}`}>
      <section ref={refElement} className={styles.resultsPage}>
        <section className={styles.brandsBox}>
          <Image placeholder='blur' className={styles.img} fill={true} alt={randomImage.alt}  src={randomImage.src}  />
          <section className={styles.commercialText}>
            {randomImage.src === KawaiiPosterImg && <KawaiiPoster closeSearchBox={closeSearchBox} />}
            {randomImage.src === OrangePosterImg && <OrangePoster closeSearchBox={closeSearchBox} />}
            {randomImage.src === KrakenPosterImg && <KrakenPoster closeSearchBox={closeSearchBox}/>}
            {randomImage.src === DiorPosterImg && <DiorPoster closeSearchBox={closeSearchBox}/>}
            {randomImage.src === LeopardPosterImg && <LeoPoster closeSearchBox={closeSearchBox}/>} 
        
          </section>
        </section>
        <section className={styles.firstResultBox}>
        <h1 className={styles.resultTitle}>Search results for "{searchQuery}": {isLoadingResults === false && searchResultsCount !== null && searchResultsCount}</h1>
        <div className={styles.resultList}>
          {isLoadingResults === true && <NavSearchLoader />}
            {searchResults.length > 0 && isLoadingResults === false && searchResults.map((item) => {
              return <SearchCard key={item.id} item={item} closeSearchBox={closeSearchBox} />
            })}
           
        </div>
        </section>
      </section>
      </section>}
    </>
  )
}
