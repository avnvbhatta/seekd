import React, { useState, useContext, useEffect } from 'react';
import { useRealmApp } from "../../RealmApp"
import { Context } from "../../contexts";
import { Link } from 'react-router-dom';
import Avatar from "../../ui/Avatar";

const Sidebar = () => {
    const app = useRealmApp();
    const {user} = useContext(Context);
    
    const logOut = async () => {
        try {
            await app.logOut();
        } catch (error) {
            console.log(error)
        }
    }
    
    const [showSidebar, setShowSidebar] = useState(false);

    const Nav = () => {
        return <nav aria-label="Sidebar" className="mt-5">
        <div className="px-2 space-y-1">
        <Link to="/home" onClick={() => setShowSidebar(false)}>
            <div className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <svg className="text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
            </div>
        </Link>
        
        </div>
        <hr className="border-t border-gray-200 my-5" aria-hidden="true" />
        <div className="px-2 space-y-1">

        <Link to="/projects" onClick={() => setShowSidebar(false)}>
            <div className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <svg className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
                Projects
            </div>
        </Link>
        

        <Link to="/users" onClick={() => setShowSidebar(false)}>
            <div className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <svg className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Users
            </div>
        </Link>
        </div>
        <hr className="border-t border-gray-200 my-5" aria-hidden="true" />
        <div className="px-2 space-y-1">
        <Link to="/add-project" onClick={() => setShowSidebar(false)}>
            <div className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <svg className="text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add a Project
            </div>
        </Link>
        

        </div>
    </nav>
    }

    useEffect(() => {

    },[user.name])

    if(!user || !user.name){
        return <div></div>
    }
    return ( 
        <>
            <div className="lg:hidden ">
                <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
                <div>
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg" alt="Workflow" />
                </div>
                <div>
                    <button type="button" 
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            {showSidebar && 
                <div className="lg:hidden">
                    <div className="fixed inset-0 flex z-40">
                        <div className="fixed inset-0">
                            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
                        </div>
                        <div tabIndex="0" className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button type="button" 
                                onClick={() => setShowSidebar(false)}
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Close sidebar</span>
                                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            </div>
                            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg" alt="Workflow" />
                            </div>
                            <Nav />
                            </div>
                            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <div className="flex-shrink-0 w-full group block">
                                <div className="flex items-center justify-between">
                                <Link to="/profile" onClick={() => setShowSidebar(false)}>
                                    <div className="flex flex-row  cursor-pointer">
                                    {user && user.img_url ? <img className="inline-block h-9 w-9 rounded-full" src={user.img_url} alt=""/> : <Avatar size={9}/>}
                                    
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                {user.name}
                                            </p>
                                            
                                                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                                    View profile
                                                </p>
                                        </div>
                                    </div>
                                    </Link>
                                    <div className="text-blue-500 cursor-pointer" onClick={() => logOut()}>
                                        <svg className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                        </div>
                    </div>
                </div>
            }
    

        <div className="hidden h-screen lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg" alt="Workflow"/>
                </div>
                <Nav />
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-row  cursor-pointer">
                            {user && user.img_url ? <img className="inline-block h-9 w-9 rounded-full" src={user.img_url} alt=""/> : <Avatar size={9}/>}
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                    {user.name}
                                </p>
                                <Link to="/profile">
                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                        View profile
                                    </p>
                                </Link>
                               
                            </div>
                        </div>
                        <div className="text-blue-500 cursor-pointer" onClick={() => logOut()}>
                            <svg className="text-gray-400 group-hover:text-gray-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
     );
}
 
export default Sidebar;