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
        <div className="relative">
            
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
            <button onClick={prev} className="top-1/2 left-8  absolute rounded-full bg-gray-200 hover:bg-white">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500 p-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onClick={next} className="top-1/2 right-8 absolute  rounded-full bg-gray-200 hover:bg-white">
                <svg className="w-6 h-6  lg:w-8 lg:h-8 text-blue-500 p-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

        </div>
        

            
      );
} 

export default MyCarousel;