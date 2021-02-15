import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import queries from '../../graphql/queries';
import LoadingSpinner from '../../components/loadingspinner';
import Search from '../../components/search';
import ProjectDetail from '../../components/project-detail';

const Projects = () => {

    const { loading, data } = useQuery(queries.GET_PROJECTS);

    const [projects, setProjects] = useState(null)
    const [searchedProjects, setSearchedProjects] = useState(null)
    const [currentProject, setCurrentProject] = useState(null)
    const [showSearchResults, setShowSearchResults] = useState(false)



    useEffect(() => {
        if(data && data.projects.length > 0){
            setProjects(data.projects)
            setSearchedProjects(data.projects)
            setCurrentProject(null);
        }
    }, [data])

    return ( 
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            
            <div className="flex-1 relative z-0 flex overflow-hidden flex-col xl:flex-row ">
            
                {loading && <LoadingSpinner color="text-blue-500" size="16"/> }
                {
                     projects && 
                    <Search type="project" label="Projects" initial={projects} setCurrent={setCurrentProject} searched={searchedProjects} setSearched={setSearchedProjects} showSearchResults={showSearchResults} setShowSearchResults={setShowSearchResults}/>
                }
                {!showSearchResults && <div className="lg:hidden text-center flex flex-col items-center text-md" onClick={() => setShowSearchResults(!showSearchResults)}>
                    <p>View All Projects</p>
                    <svg className="w-5 h-5 text-blue-500 text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>}
                {
                    currentProject ?
                    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last" tabIndex="0">
                        <ProjectDetail  project={currentProject} />
                    </div>
                    :
                    <div className="flex  w-full mt-32 flex-col items-center">
                        
                        <svg className="h-64 w-64 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                        <p className="text-4xl tracking-tight font-extrabold text-blue-200 text-center">
                            Search or click on a project to begin!    
                        </p>   
                    </div>
                }
            </div>
        </div>
    );
}
 
export default Projects;