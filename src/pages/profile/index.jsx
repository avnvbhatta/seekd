import React, { useContext } from 'react';
import Card from '../../components/card';
import { Context } from "../../contexts";

const Profile = () => {
    const { user } = useContext(Context);
    console.log(user)
    return ( 
          <div>
            <div className="">
              <img className=" h-60 w-full object-cover" src={user.cover_url} alt=""/>
            </div>
            <div className="bottom-32 relative max-w-5xl mx-8 rounded-lg px-4 py-16 lg:px-8 ">
              <div className="flex flex-col justify-items-start">
                <div className="flex">
                  <img className="h-36 w-36 rounded-full ring-8 ring-white sm:h-36 sm:w-36" src={user.img_url} alt=""/>
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
                    <div className="flex items-center mt-2 ">
                        <svg className="text-gray-800 h-6 w-6 top-1 relative inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="ml-2 mt-1 text-lg text-gray-900 inline">
                            {user.employer}
                        </p>
                    </div>
                    <div className="flex flex-wrap mt-4">
                        {
                            user.technologies.map((technology, idx) => {
                                return <div key={idx} className="mr-2 mb-2 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        {technology}
                                    </div>
                            })
                        }
                    </div>

                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4">
                        <span className="inline">{`${user.name.split(" ")[0]}'s `}</span>
                        <span className="text-blue-500 xl:inline">Projects</span>
                    </h1>
                    <div className="flex flex-wrap justify-center">
                        {
                            user.projects.map((project,idx) => {
                                return <Card user={user} project={project}/>
                            })
                        }
                    </div>
                    
                   
                </div>
              </div>
            </div>
          </div>
     );
}
 
export default Profile;