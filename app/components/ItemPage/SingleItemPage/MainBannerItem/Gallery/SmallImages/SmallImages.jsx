import styles from './SmallImages.module.css'
import { v4 as uuidv4 } from 'uuid';
import ImageLoader from '@app/components/Reusables/ImageLoader/ImageLoader'
import React, { memo } from 'react';

export default function SmallImages() {
  return (
    <div className={styles.smallImgBox} key={uuidv4()}>
            <ImageLoader />
           <Image
          onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
            onClick={() => setAsMainImage(img, i)}
            className={`${styles.smallImg} ${mainImage === img && styles.active}`} alt="small-image" fill={true} src={`/${img}`} />
          </div>
  )
}
