import styles from './MobileSearchPage.module.css';
import { poppins } from '@app/fonts';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SearchCardMobile from '@app/components/ItemCards/SearchCard/SearchCardMobile';
import NavSearchLoader from './NavSearchLoader/NavSearchLoader';

export default function MobileSearchPage({closeSearchBox, isSearchOpen}) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsCount, setSearchResultsCount] = useState(null);
  const [isLoadingResults, setIsLoadingResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const closeAndResetSearchBox = () => {
    closeSearchBox();
    setSearchQuery("");
    setSearchResults([]);
    setSearchResultsCount(null);
  }

  useEffect(() => {
    // To avoid tha the page below scrolls on Y axis
    if(isSearchOpen === true){
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }

   /*  if(isSearchOpen === true){
      inputRef.current.focus();
    } */

    if(searchQuery === ""){
      setSearchResultsCount(null);
      setSearchResults([]);
    }


    if(isSearchOpen === false){
      setSearchQuery("");
      setSearchResults([]);
      setSearchResultsCount(null);
    }
  }, [isSearchOpen]);

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
   <main className={`${styles.mobileSearch} ${isSearchOpen === true && styles.active}  ${isSearchOpen === false && styles.notActive} ${poppins.className}`}>
   
    <div className={styles.searchBox}>
        <div className={styles.iconBox}>
        <FontAwesomeIcon
        onClick={()=>{
          closeAndResetSearchBox();
        }}
        icon={faChevronLeft} className={styles.icon} />
        </div>
        <input ref={inputRef} value={searchQuery} onChange={handleInputChange} type="text" placeholder="Search" className={styles.searchInput} />
    </div>
    {isLoadingResults === false && searchResultsCount !== null && searchQuery !== "" && <h1 className={styles.resultsCount}>{searchResults.length} results found:</h1>}
   
    <section className={styles.list}>
     {isLoadingResults === true && <NavSearchLoader />}
    {searchResults.length > 0 && isLoadingResults === false && searchResults.map((item) => {
              return <SearchCardMobile key={item.id} item={item} closeSearchBox={closeSearchBox} closeAndResetSearchBox={closeAndResetSearchBox} />
            })}
    </section>
   </main>
  )
}
