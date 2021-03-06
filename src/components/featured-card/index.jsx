import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../ui/Avatar';
import moment from "moment";


const FeaturedCard = ({project}) => {
  return (
    <div className="relative flex flex-col lg:flex-row rounded-md  lg:rounded-l-md shadow-lg cursor-pointer ">
      
      {project.images.length > 0 ? 
          <Link to={`/projects/${project.name}`}  className="left w-full lg:w-3/5 h-48 lg:h-auto  rounded-t-md lg:rounded-r-none lg:rounded-b-none lg:rounded-l-md"
          style={{ backgroundImage: `url(${project.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            
        </Link>
          :
          <Link to={`/projects/${project.name}`}>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 left w-full lg:w-3/5 h-48 lg:h-auto  rounded-t-md lg:rounded-r-none lg:rounded-b-none lg:rounded-l-md flex justify-center items-center">
              <svg className="text-gray-50 h-24 w-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
          </Link>
      }
      <div className="right  p-6 lg:py-8 px-8 w-full lg:w-2/5  bg-white rounded-b-md lg:rounded-l-none lg:rounded-r-md flex flex-col h-full justify-center">
        <Link to={`/projects/${project.name}`} className="text-left">
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl lg:text-4xl hidden lg:block">
              <span className="block xl:inline text-black">{project.name}</span>
            </h1>
            <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900 block lg:hidden">
              {project.name}
            </h3>
            <p className="mt-3 text-base text-gray-500 ">
              {project.description}
            </p>
        </Link>
        
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div href="#">
              {project && project.user_id && project.user_id.img_url ? <img className="h-10 w-10 rounded-full" src={project.user_id.img_url} alt=""/> : <Avatar size={9}/>  }
            </div>
          </div>
          <Link to={`/profile/${project.user_id._id}`}>
            <div className="ml-3">
              <div className="text-sm leading-5 font-medium text-gray-900">
                <div className="hover:underline">
                  {project.user_id.name}
                </div>
              </div>
              <div className="flex text-sm leading-5 text-gray-500">
                {moment(project.createDate).fromNow()}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>

  );
};

export default FeaturedCard;
