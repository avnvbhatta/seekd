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
        <div className="flex items-center">
            <button onClick={prev} className="relative bottom-10 h-8">
                <svg className="w-8 h-8 text-blue-500 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <Carousel 
                showThumbs={true}  
                infiniteLoop
                selectedItem={currentSlide}
                onChange={updateCurrentSlide}
                showArrows={false}
                
            >
                {images.map((image,idx) => {
                    return <div className="rounded-lg" key={idx}>
                            <img 
                            src={image} />
                        </div>
                })}
            </Carousel>
            <button onClick={next} className="relative bottom-10 h-8">
                <svg className="w-8 h-8 text-blue-500 outline-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
        
        </>
        

            
      );
} 

export default MyCarousel;