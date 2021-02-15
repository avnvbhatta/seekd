import React from 'react';
import LoadingSpinner from '../loadingspinner';
import {getRandomGradient} from "../../utils/index"

const CardProjectMini = ({project}) => {

    if(!project){
        return <LoadingSpinner color="text-blue-500"  size={16}/>
    }
    return ( 
        <div className="flex flex-col xl:pl-6 xl:pr-2 mb-2 ">
            <div className="relative rounded-lg border border-gray-300 bg-white  shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex-shrink-0">
                    {project.images.length > 0 ? 
                        <img
                            className="h-16 w-24 rounded-l-md"
                            src={project.images[0]}
                            alt="feature_image"
                        />
                        :
                        <div className={`${getRandomGradient()} h-16 w-24 rounded-l-md flex justify-center items-center`}>
                            <svg className="text-gray-50 h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                        </div>
                    }
                </div>
                <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="text-md font-medium text-gray-900 truncate">
                    {project.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                    {project.user_id.name}
                    </p>
                </a>
                </div>
            </div>
        </div>
     );
}
 
export default CardProjectMini;