import React, { useState } from 'react';
import CardProjectMini from '../card-project-mini';
import CardUserMini from '../card-user-mini';

const Search = ({type, label, initial, setCurrent, searched, setSearched, showSearchResults, setShowSearchResults}) => {

    const handleChange = (e) => {
        let searchString = e.target.value; 
        if(searchString.length > 0){
            const temp= searched.filter(searchItem => searchItem.name.toLowerCase().includes(searchString));
            setSearched(temp);
            setShowSearchResults(true);
        }
        else{
            setSearched(initial);
            setShowSearchResults(false);

        }
    }


    return ( 
        <div className="relative xl:flex xl:flex-col flex-shrink-0 w-full xl:w-96 border-r border-gray-200 ">
            <div className="px-6 pt-4 pb-4">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl mb-2 ">
                <span className="inline">{label}</span>
                <span className="text-blue-500 xl:inline">Directory</span>
            </h1>
            <div className="mt-3 flex space-x-4" >
                <div className="flex-1 min-w-0">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <input type="search" name="search" id="search"  onChange={e => handleChange(e)} className="focus:ring-pink-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Search"/>
                </div>
                </div>
            </div>
            </div>
            <nav className="hidden xl:flex flex-1 min-h-0 relative overflow-y-auto" aria-label="Directory">
                <ul className={`relative z-0 w-full ${type === 'user' ? 'divide-y divide-gray-200' : ''} `}>
                    {searched.map((searchedItem,idx) => {
                            return  <li key={idx} onClick={() => {setCurrent(searchedItem); }}>
                                    {type ==='project' ? <CardProjectMini project={searchedItem} /> : <CardUserMini user={searchedItem} />}
                                </li>
                    })}
                </ul>
            </nav>
            {showSearchResults && 
            <nav className="flex flex-col shadow-lg xl:hidden  relative z-20 w-full  bg-gray-50 rounded-md px-6 pb-4 " aria-label="Directory">
                
                <ul className={`relative z-0 w-full ${type === 'user' ? 'divide-y divide-gray-200' : ''} overflow-y-auto`}>
                    {searched.map((searchedItem,idx) => {
                            return  <li className="flex-grow-1" key={idx} onClick={() => {setCurrent(searchedItem); setShowSearchResults(false)}}>
                                    {type ==='project' ? <CardProjectMini project={searchedItem} /> : <CardUserMini user={searchedItem} />}
                                </li>
                    })}
                </ul>
                <div className="lg:hidden text-center flex flex-col items-center text-md" onClick={() => setShowSearchResults(!showSearchResults)}>
                    <svg className="w-5 h-5 text-blue-500 text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <p>Hide </p>

                </div>
            </nav>}
            
        </div>
     );
}
 
export default Search;