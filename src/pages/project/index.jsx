import { useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MyCarousel from '../../components/carousel';
import FeaturedCard from '../../components/featured-card';
import LoadingSpinner from '../../components/loadingspinner';
import ProjectDetail from '../../components/project-detail';
import queries from '../../graphql/queries';
import Avatar from '../../ui/Avatar';
import {getRandomGradient} from "../../utils/"

const Project = ({project}) => {

    const history = useHistory();
    const appName = history.location.pathname.split("/")[2];
    const { loading, data } = useQuery(queries.GET_PROJECT_BY_NAME, {
        variables: { query: {name: appName } }
    });

    if(loading){
        return <LoadingSpinner size={16} color="text-blue-500" />;
    }    

    return (
       
        <ProjectDetail project={data.project}/>

     );
}
 
export default Project;