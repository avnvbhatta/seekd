import React from 'react';
import LoadingSpinner from '../loadingspinner';
import Avatar from "../../ui/Avatar";
import {getRandomGradient} from "../../utils/index"
import { Link } from 'react-router-dom';
import moment from "moment";

const Card = ({user, project, manage}) => {


  if(!user || !project){
    return <LoadingSpinner />
  }

  return (
    <Link to={`projects/${project.name}`} className="visible flex flex-col rounded-lg shadow-md overflow-hidden ">
      <div className="flex-shrink-0" >
        {project.images.length > 0 ? 
          <img
            className="h-48 w-full object-cover"
            src={project.images[0]}
            alt="feature_image"
          />
          :
          <div className={`${getRandomGradient()} w-full h-48 flex justify-center items-center`}>
            <svg className="text-gray-50 h-24 w-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
        }
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
            <div className="block cursor-pointer">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-xl leading-7 font-semibold text-gray-900 flex flex-row">
                  {project.name}
                </h3>
                {manage && <div className="flex flex-row">
                  <Link  to={{pathname: `/manage-projects/${project.name}`, state: project}} className="inline-flex items-center text-md leading-4 font-medium rounded-md text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button type="button" className="inline-flex items-center text-md leading-4 font-medium rounded-md text-red-500  hover:underline ml-2">
                    Delete
                  </button>
                </div>}
              </div>
              
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
          <Link to={`/profile/${user._id}`}>
            <div className="ml-3">
              <div className="text-sm leading-5 font-medium text-gray-900">
                <p className="hover:underline">
                  {user.name}
                </p>
                {
                  project.createDate && <p className="text-xs text-gray-500">
                    Uploaded {moment(project.createDate).fromNow()}
                  </p>
                }
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default Card;
