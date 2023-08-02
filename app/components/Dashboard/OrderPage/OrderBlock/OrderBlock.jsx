"use client"

import styles from './OrderBlock.module.css';
import { poppins } from '@app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import BoughtItemCard from '@app/components/ItemCards/BoughtItemCard/BoughtItemCard';
import HorizontalDivider from '@app/components/Reusables/HorizontalDivider/HorizontalDivider';

export default function OrderBlock() {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
  return (
   <>
   <main className={styles.block}>
   
    <div className={`${styles.infoBox} ${styles.dateBox}`}>
        <label className={styles.label}>Date</label>
        <h4 className={`${styles.info} ${styles.date}`}>23-06-2023</h4>
    </div>
    <div className={`${styles.infoBox} ${styles.orderNumberBox}`}>
        <label className={styles.label}>Order#</label>
        <h4 className={`${styles.info} ${styles.orderNumber}`}>F63JD9RTG68IQ0PF</h4>
    </div>
    <div className={`${styles.infoBox} ${styles.itemsBox}`}>
        <label className={styles.label}>Items</label>
        <h4 className={`${styles.info} ${styles.items}`}>2</h4>
    </div>
    <div className={`${styles.infoBox} ${styles.totalBox}`}>
        <label className={styles.label}>Total</label>
        <h4 className={`${styles.info} ${styles.total}`}>$ 579.90</h4>
    </div>
    <div className={`${styles.infoBox} ${styles.statusBox}`}>
        <label className={styles.label}>Status</label>
        <h4 className={`${styles.info} ${styles.status}`}>Delivered</h4>
    </div>
    <FontAwesomeIcon
    onClick={toggleDetails}
    className={styles.icon} icon={showDetails === true ? faMinus : faPlus} />
    <div className={styles.tabletShowDetailBox}>
        <h4 className={styles.showDetailsLabel}>Order Details</h4>
        <FontAwesomeIcon
        onClick={toggleDetails}
        className={styles.tabletIcon} icon={showDetails === true ? faMinus : faPlus} />
    </div>
   </main>
   {showDetails && <section className={styles.details}>
    <h4 className={styles.detailsTitle}>Order Details</h4>
    <div className={styles.detailsBox}>
        <h4 className={styles.greyLabel}>Shipping code</h4>
        <h4 className={styles.trackingCode}>GTE8JD71PANF74LP</h4>
        <button className={`${styles.trackingBtn} blackButton`}>Tracking
        <FontAwesomeIcon className={styles.trackingIcon} icon={faTruck} />
         </button>
    </div>
    <h4 className={styles.detailsTitle}>Address</h4>
    <div className={styles.addressCard}>
        <h4 className={styles.shipInfo}>Felix De Baptistis</h4>
        <h4 className={styles.shipInfo}>Vicolo Bianco 13</h4>
        <h4 className={styles.shipInfo}>Bologna, 40139</h4>
        <h4 className={styles.shipInfo}>Emilia Romagna</h4>
        <h4 className={styles.shipInfo}>Italy</h4>
    </div>
    <h4 className={styles.detailsTitle}>Your Items (2)</h4>
    <div className={styles.orderedItemsBox}>
        <BoughtItemCard />
        <BoughtItemCard />
    </div>
    <div className={styles.amountsBox}>
        <div className={styles.amounts}>
            <h4 className={styles.amountLabel}>Subtotal</h4>
            <h4 className={styles.amountPrice}>$ 579.90</h4>
        </div>
        <div className={styles.amounts}>
            <h4 className={styles.amountLabel}>Shipping</h4>
            <h4 className={styles.amountPrice}>$ 00.00</h4>
        </div>
        <div className={styles.lineContainer}>
            <HorizontalDivider color={"var(--medium-grey)"} />
        </div>
        <div className={styles.amounts}>
            <h4 className={styles.amountLabel}>Total</h4>
            <h4 className={styles.amountPrice}>$ 579.90</h4>
        </div>
    </div>
    </section>}
    <div className={styles.lineBox}>
        <HorizontalDivider color={"var(--thin-grey)"} />
    </div>
   </>
  )
}
