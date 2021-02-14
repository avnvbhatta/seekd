import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import queries from '../../graphql/queries';
import LoadingSpinner from '../../components/loadingspinner';
import Search from '../../components/search';
import ProjectDetail from '../../components/project-detail';

const Projects = () => {

    const { loading, data } = useQuery(queries.GET_PROJECTS);

    const [currentProject, setCurrentProject] = useState(null)


    useEffect(() => {
        if(data && data.projects.length > 0){
            setCurrentProject(data.projects[0]);
        }
    }, [data])

    return ( 
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            
            <div className="flex-1 relative z-0 flex overflow-hidden">
            
                {loading && <LoadingSpinner color="text-blue-500" size="16"/> }
                {currentProject &&  <>
                            <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last" tabindex="0">
                                <ProjectDetail  project={currentProject} />
                            </div>
                            <Search projects={[...data.projects, ...data.projects]} setCurrentProject={setCurrentProject}/>

                        </>}
                

                

            </div>

        </div>
    );
}
 
export default Projects;