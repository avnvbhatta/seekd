import { useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MyCarousel from '../../components/carousel';
import FeaturedCard from '../../components/featured-card';
import LoadingSpinner from '../../components/loadingspinner';
import queries from '../../graphql/queries';
import Avatar from '../../ui/Avatar';
import {getRandomGradient} from "../../utils/"

const Project = () => {

    const history = useHistory();
    const appName = history.location.pathname.split("/")[2];
    const { loading, data } = useQuery(queries.GET_PROJECT_BY_NAME, {
        variables: { query: {name: appName } }
    });

    if(loading){
        return <LoadingSpinner size={16} color="text-blue-500" />;
    }    

    return (
        <div className="max-w-7xl w-full mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl mt-4 mx-8 mb-16">
                <span className="inline">View</span>
                <span className="text-blue-500 xl:inline">Project</span>
            </h1>
            <div className="relative max-w-6xl flex flex-col justify-center items-center xl:items-stretch xl:flex-row rounded-md  xl:rounded-l-md  shadow-lg mx-8">
            {
                data.project.images && data.project.images.length > 0 ? 
                <div className="left xl:flex-grow  w-full relative h-48 md:h-96 xl:h-auto lg:mt-0  xl:rounded-l-md ">
                    <MyCarousel images={data.project.images}/>
                </div>
                :
                <div className={`xl:flex-grow-0 w-full  relative h-96 xl:h-auto lg:mt-0 flex justify-center items-center xl:rounded-l-md ${getRandomGradient()}`}>
                    <svg className="text-white w-48 h-48" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                </div>
            }
            
            <div className="right w-full xl:w-auto xl:flex-grow-0 p-6 lg:py-8 px-8   bg-white rounded-b-md xl:rounded-l-none xl:rounded-r-md flex flex-col justify-center">
                <div className="text-left">
                    <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl lg:text-4xl hidden lg:block">
                    <span className="block xl:inline text-black">{data.project.name}</span>
                    </h1>
                    <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900 block lg:hidden">
                    {data.project.description}
                    </h3>
                    <p className="mt-3 text-base text-gray-500 ">
                    {data.project.description}
                    </p>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="flex items-center">
                        <div >
                            {data.project && data.project.user_id && data.project.user_id.img_url ? <img className="h-10 w-10 rounded-full" src={data.project.user_id.img_url} alt=""/> : <Avatar size={9}/>  }
                        </div>
                        <div className="ml-3">
                            <p className="text-sm leading-5 font-medium text-gray-900">
                                <div className="hover:underline">
                                {data.project.user_id.name}
                                </div>
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex flex-wrap mt-4">
                            {
                                data.project.technologies.map((technology, idx) => {
                                    return <div key={idx} className="mr-2 mb-2 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            {technology}
                                        </div>
                                })
                            }
                        </div>
                        <div className="flex flex-wrap mt-4">
                            {data.project.url && data.project.url.length > 0 &&
                                <a href={`${data.project.url}`} target="_blank" className="w-full flex-grow mb-2 md:mb-0 md:w-auto md:mr-2 flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    View Demo
                                </a>
                            }
                            {data.project.repository_url && data.project.repository_url.length > 0 &&
                                <a href={`${data.project.repository_url}`} target="_blank" className="w-full flex-grow mb-2 md:mb-0 md:w-auto md:mr-2 flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    View Code
                                </a>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    

     );
}
 
export default Project;