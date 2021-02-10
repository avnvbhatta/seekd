import React from 'react';
import { useRealmApp } from "../../RealmApp"

const Home = () => {
    const app = useRealmApp();
      
    const logOut = async () => {
      try {
        await app.logOut();
      } catch (error) {
        console.log(error)
      }
    }


    return ( 
        <div>
            This is Home
            <button type="button" onClick={() => logOut()} className="absolute inset y-0 right-0 cursor-pointer inline-flex items-center px-4 py-2 m-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign Out
            </button>
        </div>
     );
}
 
export default Home;