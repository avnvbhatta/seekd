import { useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import FeaturedCard from '../../components/featured-card';
import LoadingSpinner from '../../components/loadingspinner';
import queries from '../../graphql/queries';

const Project = () => {

    const history = useHistory();
    const appName = history.location.pathname.split("/")[2];
    const { loading, data } = useQuery(queries.GET_PROJECT_BY_NAME, {
        variables: { query: {name: appName } }
    });

    if(loading){
        return <LoadingSpinner color="text-blue-500" size="16"/>
    }
    

    return (
        
    <div class="py-16 overflow-hidden lg:py-24">
        <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div class="relative mt-12 sm:mt-16 lg:mt-24">
            <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div class="lg:col-start-2">
                <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                    {data.project.name}
                </h3>
                <p class="mt-3 text-lg text-gray-500">
                    {data.project.description}
                </p>

               

                <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                        <a href="#">
                        <img className=" h-9 w-9 rounded-full" src={data.project.user_id.img_url} alt=""/>

                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm leading-5 font-medium text-gray-900">
                        <a href="#" className="hover:underline">
                            {data.project.user_id.name}
                        </a>
                        </p>
                    </div>
                    </div>

                    <div className="flex flex-wrap mt-4">
                    {
                        data.project.technologies.map((technology, idx) => {
                            return <div key={idx} className="mr-2 mb-2 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    {technology}
                                </div>
                        })
                    }
                </div>

                
                </div>

                <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                    <img class="relative mx-auto w-full"  src="https://tailwindui.com/img/features/feature-example-2.png" alt=""/>
                </div>
            </div>
            </div>
        </div>
        </div>

     );
}
 
export default Project;