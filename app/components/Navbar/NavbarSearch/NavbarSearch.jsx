"use client"

import { useState } from 'react';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NavbarSearch.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import SearchCard from '@app/components/ItemCards/SearchCard/SearchCard';
import NavSearchLoader from './NavSearchLoader/NavSearchLoader';


import KawaiiPoster from './Advertising/KawaiiAdvertising/KawaiiPoster';
import LeoPoster from './Advertising/LeoAdvertising/LeoPoster';
import KrakenPoster from './Advertising/KrakenAdvertising/KrakenPoster';
import OrangePoster from './Advertising/OrangeAdvertising/OrangePoster';
import DiorPoster from './Advertising/DiorAdvertising/DiorPoster';






export default function NavbarSearch({isSearchOpen}) {
    const [openSearch, setOpenSearch] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [randomImage, setRandomImage] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultsCount, setSearchResultsCount] = useState(null);
    const [isLoadingResults, setIsLoadingResults] = useState(false);
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
        const randomIndex = Math.floor(Math.random() * 5);
        setRandomImage(randomIndex);
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
    {openSearch === true  && <section  className={`${styles.searchResults} ${poppins.className}`}>
      <section ref={refElement} className={styles.resultsPage}>
        <section className={styles.brandsBox}>
         {/*  <Image className={styles.img} fill={true} alt={randomImage.alt}  src={randomImage === "" ? OrangePoster : randomImage.src}  /> */}
          <section className={styles.commercialText}>
          {randomImage === 0 && <LeoPoster closeSearchBox={closeSearchBox}/>} 
            {randomImage === 1 && <KawaiiPoster closeSearchBox={closeSearchBox} />}
            {randomImage === 2 && <OrangePoster closeSearchBox={closeSearchBox} />}
            {randomImage === 3 && <KrakenPoster closeSearchBox={closeSearchBox}/>}
            {randomImage === 4&& <DiorPoster closeSearchBox={closeSearchBox}/>}
            
        
          </section>
        </section>
        <section className={styles.firstResultBox}>
        <h1 className={styles.resultTitle}>Search results for {`${searchQuery === ''  ? "" : searchQuery}`}: {isLoadingResults === false && searchResultsCount !== null && searchResultsCount}</h1>
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
