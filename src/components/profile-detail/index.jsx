import React from 'react';
import Avatar from "../../ui/Avatar";
import Card from '../../components/card';
import { Link } from 'react-router-dom';
import { useRealmApp } from "../../RealmApp"

const ProfileDetail = ({user}) => {

    const app = useRealmApp();
    const id = app.currentUser.id;

    return ( 
        <div className="overflow-y-auto">
                <div >
                {user && user.cover_url ? 
                    <img className=" h-60 w-full object-cover" src={user.cover_url} alt=""/> 
                    : 
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full h-60"></div>}
                </div>
                <div className="bottom-32 relative md:mx-8 rounded-lg px-4 py-16 lg:px-8 ">
                <div className="flex flex-col justify-items-start">
                    <div className="flex justify-between items-end">
                        {user && user.img_url ? <img className="h-28 w-28 rounded-full ring-8 ring-white md:h-36 md:w-36" src={user.img_url} alt=""/> : <Avatar size={28}/>  }
                        { user._id === id?
                            <Link to={{pathname: 'edit-profile', state: user}}>
                            <button type="button" className="inline-flex items-center h-10 px-3 md:px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <svg  className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        </Link>
                        : null
                        }
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl">
                            <span className="inline">{user.name}</span>
                        </h1>
                        <p className="mt-2 text-xl text-gray-900">
                            {user.bio}
                        </p>
                        <div className="flex items-center mt-2">
                            <svg className="text-gray-800 h-6 w-6 top-1 relative inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="ml-2 mt-1 text-lg text-gray-900 inline">
                                {`${user.city}, ${user.country}`}
                            </p>
                        </div>
                        {user.employer ? 
                            <div className="flex items-center mt-2 ">
                                <svg className="text-gray-800 h-6 w-6 top-1 relative inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p className="ml-2 mt-1 text-lg text-gray-900 inline">
                                    {user.employer}
                                </p>
                            </div>
                            :
                            null
                        }
                        <div className="flex flex-wrap mt-4">
                            {
                                user.technologies.map((technology, idx) => {
                                    return (technology.length > 0 && <div key={idx} className="mr-2 mb-2 inline-flex items-center px-3 py-1 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            {technology}
                                        </div>)
                                })
                            }
                        </div>

                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4">
                            <span className="inline">{`${user.name.split(" ")[0]}'s `}</span>
                            <span className="text-blue-500 xl:inline">Projects</span>
                        </h1>
                        <div className="max-w-7xl mx-auto">
                            <div className="mt-6 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                                {user.projects.map((project, idx) => {
                                    return <Card project={project} key={idx} user={user}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
             </div>
     );
}
 
export default ProfileDetail;