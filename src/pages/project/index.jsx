import { useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MyCarousel from '../../components/carousel';
import LoadingSpinner from '../../components/loadingspinner';
import queries from '../../graphql/queries';
import Avatar from "../../ui/Avatar";

const Project = () => {

    const history = useHistory();
    const appName = history.location.pathname.split("/")[2];
    const { loading, data } = useQuery(queries.GET_PROJECT_BY_NAME, {
        variables: { query: {name: appName } }
    });

    if(loading){
        return <LoadingSpinner color="text-blue-500" size="16"/>
    }
    

    return (
        <>
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl mt-4 ml-12 mb-16">
            <span className="inline">View</span>
            <span className="text-blue-500 xl:inline">Project</span>
        </h1>
        <div className=" flex flex-col mt-8 lg:mt-0 items-start justify-center md:items-center">
             
            <div className="overflow-hidden bg-white mx-12 rounded-lg shadow-lg">
                    <div className="relative -mt-8 mb-8  max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                        <div className="relative mt-12 sm:mt-16 lg:mt-24">
                       
                        <div className={`lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center`}>
                            <div className="lg:col-start-2">
                            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                                {data.project.name}
                            </h3>
                            <p className="mt-3 text-lg text-gray-500">
                                {data.project.description}
                            </p>
                            <div className="mt-6 flex items-center">
                                <div className="flex-shrink-0">
                                    {data && data.project.user_id.img_url ? <img className="h-12 w-12 rounded-full ring-8 ring-white sm:h-36 sm:w-36" src={data.project.user_id.img_url} alt=""/> : <Avatar size={12}/>  }
                                </div>
                                <div className="ml-3">
                                    <p className="text-lg leading-5 font-medium text-gray-900">
                                    <a href="#" className="hover:underline">
                                        {data.project.user_id.name}
                                    </a>
                                    </p>
                                </div>
                                </div>

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
                                        <a href={`${data.project.url}`} target="_blank" className="w-full mb-2 md:mb-0 md:w-auto md:mr-2 flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            View Demo
                                        </a>
                                    }
                                    {data.project.repository_url && data.project.repository_url.length > 0 &&
                                        <a href={`${data.project.repository_url}`} target="_blank" className="w-full mb-2 md:mb-0 md:w-auto md:mr-2 flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            View Code
                                        </a>
                                    }
                                    
                                </div>
                            
                            </div>

                            {data.project.images.length > 0 ? <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1 flex justify-center items-center ">
                                <MyCarousel images={data.project.images}/>
                            </div>
                            :
                            <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1 ">
                                <svg className="text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                </svg>
                            </div>
                            }
                            
                        </div>
                        </div>
                    </div>
                    </div>
        </div>
        </>
    

     );
}
 
export default Project;