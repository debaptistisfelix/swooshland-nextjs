import styles from './DeletedCartItemsBox.module.css'
import { poppins } from '@app/fonts'
import { useContext } from 'react'
import { CartContext } from '@app/context/CartContext'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function DeletedCartItemsBox() {
    const {deletedCartItemsBeforeCheckout} = useContext(CartContext)
  return (
    <>
     <main className={`${styles.section} ${poppins.className}`}>
        <h1 className={`${styles.title} smallTitle`}>Availability Check</h1>
        <p className={`${styles.parag} mainParag`}>
            The following items are no more available in the Size Option you chose when you put them in the cart:        </p>
        <section className={styles.itemList}>
            {deletedCartItemsBeforeCheckout.length > 0 && deletedCartItemsBeforeCheckout.map(elem =>{
                return <div key={elem.id} className={styles.deletedCard}>
                <FontAwesomeIcon className={styles.xIcon} icon={faX} />
                    <div className={styles.imgBox}>
                        <Image className={styles.img} fill={true} alt="photo" src={`/${elem.item.images[0]}`} />
                      
                    </div>
                    <div className={styles.textBox}>
                        <div className={styles.header}>
                            <h1 className={styles.cardTitle}>{elem.item.model}</h1>
                            <h1 className={styles.cardName}>({elem.item.name})</h1>
                        </div>
                        <p className={styles.size}>Size: {
                            elem.availableSize.EUsize === 0 ? "One Size" : "EU " + elem.availableSize.EUsize
                        }</p>
                    </div>
                </div>
            })}
        </section>
        <p className={`${styles.parag} mainParag`}>
           Click on the "Complete Order" to move on with your updated cart.</p>
    </main>
    </>
  )
}
