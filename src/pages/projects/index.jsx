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


    useEffect(() => {
        if(data && data.projects.length > 0){
            setProjects(data.projects)
            setSearchedProjects(data.projects)
            setCurrentProject(data.projects[0]);
        }
    }, [data])

    return ( 
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            
            <div className="flex-1 relative z-0 flex overflow-hidden">
            
                {loading && <LoadingSpinner color="text-blue-500" size="16"/> }
                {currentProject && projects && <>
                    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last" tabIndex="0">
                        <ProjectDetail  project={currentProject} />
                    </div>
                    <Search type="project" label="Projects" initial={projects} setCurrent={setCurrentProject} searched={searchedProjects} setSearched={setSearchedProjects}/>

                </>}
            </div>
        </div>
    );
}
 
export default Projects;