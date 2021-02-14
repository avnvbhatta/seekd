import React from 'react';
import CardProjectMini from '../card-project-mini';

const Search = ({projects, setCurrentProject}) => {
    return ( 
        <div class="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
            <div class="px-6 pt-4 pb-4">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl mb-2 ">
                <span className="inline">Projects</span>
                <span className="text-blue-500 xl:inline">Directory</span>
            </h1>
            <p class="text-sm text-gray-600">
                Search directory of  projects.
            </p>
            <form class="mt-3 flex space-x-4" action="#">
                <div class="flex-1 min-w-0">
                <label for="search" class="sr-only">Search</label>
                <div class="relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <input type="search" name="search" id="search" class="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="Search"/>
                </div>
                </div>
            </form>
            </div>
            <nav class="flex-1 min-h-0 relative overflow-y-auto" aria-label="Directory">
                <ul class="relative z-0 ">
                    {projects.map((project,idx) => {
                            return  <li className="" idx={idx} onClick={() => setCurrentProject(project)}><CardProjectMini project={project} /></li>
                    })}
                </ul>
            </nav>
        </div>
     );
}
 
export default Search;