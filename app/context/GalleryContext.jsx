import { createContext, useState, useCallback } from "react";

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
    const [mainImage, setMainImage] = useState(null)
   /*  const [zommedImg, setZommedImg] = useState(false)
    const [currentZommedImageIndex, setCurrentZommedImageIndex] = useState(0)

    const showNextImage = () => {
        setCurrentZommedImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
      };
      
      const showPreviousImage = () => {
        setCurrentZommedImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
      }; */

      const setAsMainImage = useCallback((img, index) => {
        setMainImage(img);
       /*  setCurrentZommedImageIndex(index); */
      }, []);

    return (
        <GalleryContext.Provider value={{
            mainImage,
            setMainImage,
          /*   zommedImg,
            setZommedImg,
            currentZommedImageIndex,
            setCurrentZommedImageIndex,
            showNextImage,
            showPreviousImage, */
            setAsMainImage

        }}>
            {children}
        </GalleryContext.Provider>
    )
}