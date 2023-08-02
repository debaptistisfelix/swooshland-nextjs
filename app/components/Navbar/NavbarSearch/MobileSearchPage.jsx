import styles from './MobileSearchPage.module.css';
import { poppins } from '@app/fonts';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SearchCardMobile from '@app/components/ItemCards/SearchCard/SearchCardMobile';

export default function MobileSearchPage({closeSearchBox, isSearchOpen}) {
  useEffect(() => {
    // To avoid tha the page below scrolls on Y axis
    if(isSearchOpen === true){
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  }, [isSearchOpen]);
  return (
   <main className={`${styles.mobileSearch} ${isSearchOpen === true && styles.active}  ${isSearchOpen === false && styles.notActive} ${poppins.className}`}>
   
    <div className={styles.searchBox}>
        <div className={styles.iconBox}>
        <FontAwesomeIcon
        onClick={closeSearchBox}
        icon={faChevronLeft} className={styles.icon} />
        </div>
        <input type="text" placeholder="Search" className={styles.searchInput} />
    </div>

    <section className={styles.list}>
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
      <SearchCardMobile />
    </section>
   </main>
  )
}
