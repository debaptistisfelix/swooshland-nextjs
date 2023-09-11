import styles from './SmallImages.module.css'
import { v4 as uuidv4 } from 'uuid';
import ImageLoader from '@app/components/Reusables/ImageLoader/ImageLoader'
import React, { memo } from 'react';
import Image from 'next/image';

const SmallImages = memo(({ img, i, setAsMainImage }) => {
    return (
      <div className={styles.smallImgBox}>
              <ImageLoader />
             <Image
            onLoadingComplete={(img)=>{img.classList.add(styles.showImg)}} 
              onClick={() => setAsMainImage(img, i)}
              className={`${styles.smallImg}`} alt="small-image" fill={true} src={`/${img}`} />
            </div>
    )
  })

  export default SmallImages;
