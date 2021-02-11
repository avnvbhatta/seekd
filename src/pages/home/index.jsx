import React from 'react';
import FeaturedCard from '../../components/featured-card';
import { useRealmApp } from "../../RealmApp"

const Home = () => {
    const app = useRealmApp();
      
   

    return ( 
        <div>
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4">
            <span class="inline">Featured</span>
            <span class="text-blue-500 xl:inline">Project</span>
          </h1>
          <div className="featured max-w-4xl mx-auto">
            <FeaturedCard />
          </div>

          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl my-4">
            <span class="inline">Recent</span>
            <span class="text-blue-500 xl:inline">Projects</span>
          </h1>
          <div className="featured max-w-4xl mx-auto">
            <FeaturedCard />
          </div>
        </div>
     );
}
 
export default Home;