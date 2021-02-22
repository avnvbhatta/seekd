import React from 'react';
import MyCarousel from '../../components/carousel';
import Avatar from '../../ui/Avatar';
import moment from "moment";

const ProjectDetail = ({project}) => {

    return (
        <div className="min-w-screen  bg-gray-50 flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div className="w-full max-w-6xl rounded bg-white shadow-xl pb-5 md:pb-10 px-10 xl:p-20 mx-auto text-gray-800 relative lg:text-left">
                <div className="xl:flex items-center -mx-10">
                    <div className="left w-full xl:w-1/2 mb-5 ">
                        <div className="relative">
                            {
                                project && project.images && project.images.length > 0 ? 
                                <div className="w-full relative z-10 ">
                                    <MyCarousel images={project.images}/>
                                </div>
                                :
                                <div className="w-full relative z-10 flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
                                    <svg className="text-white w-48 h-48" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                    </svg>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="right w-full xl:w-1/2 px-5 md:px-10">
                        <div className="">
                            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl lg:text-4xl hidden lg:block">
                                <span className="block xl:inline text-black">{project.name}</span>
                            </h1>
                            <h3 className="mt-2 text-xl md:text-3xl md:font-extrabold leading-7 font-semibold text-gray-900 block lg:hidden">
                                {project.name}
                            </h3>
                            <p className="mt-3 text-base text-gray-500 ">
                                {project.description}
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col">
                        <div className="flex items-center">
                            <div >
                                {project && project.user_id && project.user_id.img_url ? <img className="h-10 w-10 rounded-full" src={project.user_id.img_url} alt=""/> : <Avatar size={9}/>  }
                            </div>
                            <div className="ml-3">
                                <div className="text-sm leading-5 font-medium text-gray-900">
                                    <div className="hover:underline">
                                    {project.user_id.name}
                                    </div>
                                </div>
                                {
                                    project.createDate && <p className="text-xs text-gray-500">
                                    {moment(project.createDate).fromNow()}
                                    </p>
                                }
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex flex-wrap mt-4">
                                {
                                    project.technologies.map((technology, idx) => {
                                        return <div key={idx} className="mr-2 mb-2 inline-flex items-center px-3 py-1 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                {technology}
                                            </div>
                                    })
                                }
                            </div>
                            <div className="flex flex-wrap mt-4">
                                {project.url && project.url.length > 0 &&
                                    <a href={`${project.url}`} target="_blank" className="w-full flex-grow mb-2 md:mb-0 md:w-auto md:mr-2 flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        View Demo
                                    </a>
                                }
                                {project.repository_url && project.repository_url.length > 0 &&
                                    <a href={`${project.repository_url}`} target="_blank" className="w-full flex-grow mb-2 md:mb-0 md:w-auto md:mr-2 flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        View Code
                                    </a>
                                }
                                
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

      
    

     );
}
 
export default ProjectDetail;