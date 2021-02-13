import React, { useContext } from 'react';
import FeaturedCard from '../../components/featured-card';
import { useRealmApp } from "../../RealmApp"
import { Context } from '../../contexts';
import { useQuery } from '@apollo/client';
import queries from '../../graphql/queries';
import LoadingSpinner from "../../components/loadingspinner"
import { Link } from 'react-router-dom';
import Card from '../../components/card';

const Home = () => {
    const app = useRealmApp();
    const {user, setUser} = useContext(Context);   

    const {loading: loadingFeatured, data: featuredData} = useQuery(queries.GET_FEATURED_PROJECT);
    const {loading: loadingRecent, data: recentsData} = useQuery(queries.GET_RECENT_PROJECTS);

   

    return ( 
        <div>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4 px-8">
            <span className="inline">Featured</span>
            <span className="text-blue-500 xl:inline">Project</span>
          </h1>

          <div className="featured max-w-4xl mx-auto">
            {loadingFeatured ? <LoadingSpinner size={16} color="text-blue-500" /> : 
            
              <Link to={`/projects/${featuredData.project.name}`}>
                <FeaturedCard project={featuredData.project}/> 
              </Link> 
            
            }
          </div>

          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4 px-8">
            <span className="inline">Recent</span>
            <span className="text-blue-500 xl:inline">Projects</span>
          </h1>
          <div className="featured max-w-7xl mx-auto">
            {loadingRecent ? <LoadingSpinner size={16} color="text-blue-500" /> : 
            
              <div className="flex flex-wrap justify-center ">
                {
                    recentsData.projects.map((project,idx) => {
                        return <Link to={`/projects/${project.name}`} key={idx}> 
                            <div className="md:mx-2 mb-4">
                                <Card project={project} user={project.user_id}/>
                            </div>
                        </Link>
                    })
                }
                </div>
            }
          </div>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <Link to="/projects">
              <div className="relative flex justify-center">
                <button type="button" className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-white bg-blue-500 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg className="-ml-1.5 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>View More</span>
                </button>
              </div>
            </Link>
          </div>




        </div>
     );
}
 
export default Home;