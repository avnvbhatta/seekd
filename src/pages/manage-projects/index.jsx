import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card';
import { Context } from '../../contexts';

const ManageProjects = () => {

    const {user} = useContext(Context);

    useEffect(() => {

    }, [user])

    return ( 
    <div className="overflow-y-auto px-8 py-4">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl mb-2 ">
            <span className="inline">Manage</span>
            <span className="text-blue-500 xl:inline">Projects</span>
        </h1>
        {
            user && user.projects && user.projects.length > 0 ? 
            <>
                <p className="mt-2 text-xl text-gray-900">
                    Click on a project to edit.
                </p>
                <div className="max-w-7xl mx-auto">
                    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none relative">
                        {user.projects.map((project, idx) => {
                            return <Card manage={true} project={project} key={idx} user={user}/>
                        })}
                    </div>
                </div>
            </>
            :
            <div className="flex  w-full mt-32 flex-col items-center">
                <svg className="h-64 w-64 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
                <p className="text-md md:text-2xl tracking-tight font-bold text-blue-200 text-center">
                    You do not appear to have any projects!
                    <br />
                    Once you upload a project, you can edit it here.    
                </p>   
            </div>
        }
        
    
    </div>
    );
}
 
export default ManageProjects;