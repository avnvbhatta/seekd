import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const MyCarousel = ({images}) => {
    
    const [currentSlide, setCurrentSlide] = useState(0);

    const next = () => {
        setCurrentSlide(prev => prev+1);
    }
    
    const prev = () => {
        setCurrentSlide(prev => prev-1);
    }

    const updateCurrentSlide = (index) => {
        if (currentSlide !== index) {
            setCurrentSlide(index);
        }
    };
    
    return (
        <>
        <Carousel 
                infiniteLoop
                selectedItem={currentSlide}
                onChange={updateCurrentSlide}
                showArrows={false}
                showThumbs={false}
            >
                {images.map((image,idx) => {
                    return <div key={idx}>
                            <img 
                            src={image} />
                        </div>
                })}
            </Carousel>
        </>
        

            
      );
} 

export default MyCarousel;