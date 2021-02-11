import React, { useContext } from 'react';
import FeaturedCard from '../../components/featured-card';
import { useRealmApp } from "../../RealmApp"
import { Context } from '../../contexts';

const Home = () => {
    const app = useRealmApp();
    const {user, setUser} = useContext(Context);   
   

    return ( 
        <div>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4">
            <span className="inline">Featured</span>
            <span className="text-blue-500 xl:inline">Project</span>
          </h1>
          <div className="featured max-w-4xl mx-auto">
            <FeaturedCard />
          </div>

          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4">
            <span className="inline">Recent</span>
            <span className="text-blue-500 xl:inline">Projects</span>
          </h1>
          <div className="featured max-w-4xl mx-auto">
            <FeaturedCard />
          </div>
        </div>
     );
}
 
export default Home;