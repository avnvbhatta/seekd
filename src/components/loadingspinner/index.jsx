import React from 'react';

const LoadingSpinner = ({color}) => (
  <div className={`text-center ${color} mx-auto animate-spin ease duration-300 w-5 h-5`}>
    <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        style={{ display: "block",  backgroundColor: "rgb(255, 255, 255, 0)", animationPlayState: "paused"}}>
        <circle cx="50" cy="50" fill="none" stroke="currentColor" strokeWidth="10" r="35"
            strokeDasharray="164.93361431346415 56.97787143782138" transform="matrix(1,0,0,1,0,0)"
            style={{transform: "matrix(1, 0, 0, 1, 0, 0)", animationPlayState: "paused"}}></circle>
    </svg>
  </div>
);

export default LoadingSpinner;
