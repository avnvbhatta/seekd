import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../loadingspinner';
import Avatar from "../../ui/Avatar";
import {getRandomGradient} from "../../utils/index"

const Card = ({user, project}) => {

  if(!user || !project){
    return <LoadingSpinner />
  }

  return (
    <div className="visible flex flex-col rounded-lg shadow-md overflow-hidden min-w-xs max-w-xs lg:max-w-sm md:justify-center lg:justify-start">
      <div className="flex-shrink-0" >
        {project.images.length > 0 ? 
          <img
            className="h-48 w-full object-cover"
            src={project.images[0]}
            alt="feature_image"
          />
          :
          <div className={`${getRandomGradient()} w-96 h-48 flex justify-center items-center`}>
            <svg className="text-gray-50 h-24 w-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
      
        }
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
            <div className="block cursor-pointer">
              <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                {project.name}
              </h3>
              <p className="mt-3 text-base leading-6 text-gray-500">
                {project.description}
              </p>
            </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div>
              {user && user.img_url ? <img className="h-10 w-10 rounded-full" src={user.img_url} alt=""/> : <Avatar size={10}/>  }
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm leading-5 font-medium text-gray-900">
              <p className="hover:underline">
                {user.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
