import styles from './SmallImages.module.css'
import Image from 'next/image'
import ImageLoader from '@app/components/Reusables/ImageLoader/ImageLoader';
import { memo } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { GalleryContext } from '@app/context/GalleryContext';

const  SmallImages = memo(({images}) => {
    const {setAsMainImage} = useContext(GalleryContext);
  return (
    <section className={styles.smallImagesBox}>
        {images && images.map((img, i) =>{
          return <div className={styles.smallImgBox} key={uuidv4()}>
            <ImageLoader />
           <Image
          onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
            onClick={() => setAsMainImage(img, i)}
            className={`${styles.smallImg}`} alt="small-image" fill={true} src={`/${img}`} />
          </div>
        })}
    </section>
  )
})

export default SmallImages
