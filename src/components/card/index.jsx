import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({user, project}) => {

  return (
    <div className="visible flex flex-col rounded-lg shadow-lg overflow-hidden max-w-sm lg:mr-4 mb-4">
      <div className="flex-shrink-0" >
        <img
          className="h-48 w-full object-cover"
          src={project.images[0] ? project.images[0] : user.cover_url}
          alt="feature_image"
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <Link to={`/blog/`}>
            <div className="block cursor-pointer">
              <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                {project.name}
              </h3>
              <p className="mt-3 text-base leading-6 text-gray-500">
                {project.description}
              </p>
            </div>
          </Link>

        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href="#">
              <img
                className="h-10 w-10 rounded-full"
                src={user.img_url}
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm leading-5 font-medium text-gray-900">
              <a href="#" className="hover:underline">
                {user.name}
              </a>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
