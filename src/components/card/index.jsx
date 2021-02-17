import React, { useState } from 'react';
import LoadingSpinner from '../loadingspinner';
import Avatar from "../../ui/Avatar";
import { Link } from 'react-router-dom';
import moment from "moment";
import Delete from '../delete';

const Card = ({user, project, manage, deleteProject, deletingStatus, showDeleteAlert, setShowDeleteAlert}) => {
  

  if(!user || !project){
    return <LoadingSpinner />
  }

  return (
    <div  className="visible flex flex-col rounded-lg shadow-md overflow-hidden ">
      <Link to={`projects/${project.name}`} className="flex-shrink-0" >
        {project.images.length > 0 ? 
          <img
            className="h-48 w-full object-cover"
            src={project.images[0]}
            alt="feature_image"
          />
          :
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full h-48 flex justify-center items-center">
            <svg className="text-gray-50 h-24 w-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
        }
      </Link>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <Link  to={`projects/${project.name}`} className="flex-1">
            <div className="block">
              <div className="flex flex-row justify-between items-center">
                <div className="text-xl leading-7 font-semibold text-gray-900 flex flex-row">
                  {project.name}
                </div>
                
              </div>
              
              <div className="mt-3 text-base leading-6 text-gray-500">
                {project.description}
              </div>
            </div>
        </Link>
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
          
          {manage && showDeleteAlert && 
            <Delete title={`Delete ${project.name}?`} 
                body="Are you sure you want to delete this project? This action cannot be undone." 
                buttonLabel="Delete Project"
                deleteId={project._id}
                onDelete={deleteProject}
                onCancel={setShowDeleteAlert}
                isDeleting={deletingStatus} 

            />
        }
        </div>
        {manage && 
          <>
            <span className=" z-0 flex shadow-sm rounded-md mt-6">
              <Link to={{pathname: `/manage-projects/${project.name}`, state: project}}  className="flex justify-center flex-grow flex-1  items-center px-4 py-3 rounded-l-md border border-blue-500 bg-blue-500 text-sm font-medium text-white hover:bg-blue-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                Edit
                <svg className="w-5 h-5 text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              </Link>
            
              <button type="button" onClick={() => setShowDeleteAlert(true)} className="flex justify-center flex-grow flex-1   items-center px-4 py-3 rounded-r-md border border-red-500 bg-red-500 text-sm font-medium text-white hover:bg-red-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                Delete
                <svg className="w-5 h-5 text-white ml-2"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </span>
          </>
        }
        
      </div>
    </div>
  );
};

export default Card;
