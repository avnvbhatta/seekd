import { useQuery } from '@apollo/client';
import React from 'react';
import queries from '../../graphql/queries';
import Card from "../../components/card"
import LoadingSpinner from '../../components/loadingspinner';
import { Link } from 'react-router-dom';

const Projects = () => {

    const { loading, data } = useQuery(queries.GET_PROJECTS);

    if(loading){
        return <LoadingSpinner color="text-blue-500" size="16"/>
    }

    return ( 
        <div className="px-4">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4 mx-2">
                <span className="inline">All</span>
                <span className="text-blue-500 xl:inline">Projects</span>
            </h1>
            {data.projects.length > 0 ?
            
                <div className="flex flex-wrap justify-center lg:justify-start">
                    {data.projects.map( (project,idx) => {
                        return <Link to={`/projects/${project.name}`} key={idx}> 
                                <div className="md:mx-2 mb-4">
                                    <Card  project={project} user={project.user_id}/>
                                </div>
                            </Link>
                    })}
                </div>
            
            : 'No projects'}
        </div>
    );
}
 
export default Projects;