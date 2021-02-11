import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../loadingspinner';

const Card = ({user, project}) => {

  if(!user || !project){
    return <LoadingSpinner />
  }

  return (
    <div className="visible flex flex-col rounded-lg shadow-md overflow-hidden max-w-xs lg:max-w-sm md:justify-center lg:justify-start">
      <div className="flex-shrink-0" >
        <img
          className="h-48 w-full object-cover"
          src={project.images[0] ? project.images[0] : 'https://via.placeholder.com/250x150'}
          alt="feature_image"
        />
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
              <img
                className="h-10 w-10 rounded-full"
                src={user.img_url ? user.img_url : 'https://via.placeholder.com/150x150'}
                alt=""
              />
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
