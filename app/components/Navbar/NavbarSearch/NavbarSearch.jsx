"use client"

import { useState } from 'react';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NavbarSearch.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import SearchCard from '@app/components/ItemCards/SearchCard/SearchCard';

export default function () {
    const [openSearch, setOpenSearch] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const refElement = useRef(null);

    const openSearchBox = () => {
        setOpenSearch(true);
    }

    const closeSearchBox = () => {
        setOpenSearch(false);
        setSearchQuery('');
    }

    useEffect(() => {
      const handleClickOutside = (e) => {
          if(refElement.current && !refElement.current.contains(e.target)){
            setOpenSearch(false);
            setSearchQuery("");
          }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      }
  }, [])

    useEffect(() => {
      if(openSearch === true && searchQuery !== ""){
        console.log("openSearch:", openSearch, "searchQuery:", searchQuery)
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'visible';
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

    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    }


  return (
    <>
    <div className={`${styles.searchBox} ${openSearch === true && styles.active} ${openSearch === false && styles.notActive}`}>
            <FontAwesomeIcon
            onClick={openSearchBox}
            icon={faMagnifyingGlass} className={styles.icon} />
            {openSearch === true && <input onChange={()=>{
              console.log(event.target.value)
              setSearchQuery(event.target.value)
            }} type="text" placeholder="Search" className={`${styles.searchInput}  ${poppins.className}`} />}
            {openSearch === true && <FontAwesomeIcon icon={faX} className={`${styles.icon} ${openSearch === true && styles.active} ${styles.closeIcon}`} onClick={()=>{
              closeSearchBox();
              setSearchQuery("");
            }} />}
    </div>
    {openSearch === true && searchQuery !== "" && <section  className={`${styles.searchResults} ${poppins.className}`}>
      <section ref={refElement} className={styles.resultsPage}>
        <section className={styles.brandsBox}>
          <h1 className={styles.brandTitle}>Explore Sneakers Brands</h1>
          <div className={styles.brandList}>
            <div className={styles.brandLine}>
              <h3 className={styles.brandName}>Adidas</h3>
              <h3 className={styles.brandCount}>2</h3>
            </div>
            <div className={styles.brandLine}>
              <h3 className={styles.brandName}>Fila</h3>
              <h3 className={styles.brandCount}>2</h3>
            </div>
            <div className={styles.brandLine}>
              <h3 className={styles.brandName}>Jordan</h3>
              <h3 className={styles.brandCount}>12</h3>
            </div>
            <div className={styles.brandLine}>
              <h3 className={styles.brandName}>Nike</h3>
              <h3 className={styles.brandCount}>23</h3>
            </div>
            <div className={styles.brandLine}>
              <h3 className={styles.brandName}>Puma</h3>
              <h3 className={styles.brandCount}>2</h3>
            </div>
          </div>
        </section>
        <section className={styles.firstResultBox}>
        <h1 className={styles.resultsTitle}>Search results for "{searchQuery}":</h1>
        <div className={styles.resultList}>
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
        </div>
        </section>
      </section>
      </section>}
    </>
  )
}
