import React from 'react';
import { useQuery } from "@apollo/client";
import queries from "../../graphql/queries";
import config from "../../graphql/config"

const Home = () => {
    const { loading, data, error } = useQuery(queries.GET_USERS);

    console.log(data)
      
  

    const register = async () => {
      const email = "avnvbhatta@gmail.com";
      const password = "Pa55w0rd";
      try {
        const res = await config.app.emailPasswordAuth.registerUser(email,password);
        console.log(res);
      } catch (error) {
        console.log(error)
      }
    }

    const logOut = async() => {
      try {
        const res = await config.app.currentUser.logOut();
        console.log(res);
      } catch (error) {
        console.log(error)
      }
    }
      
    return ( 
        <div>
            This is homesss
            {loading ? <div>Loading...</div> :
              <>
                { data && data.users.map((user,idx) => {
                return <p key={idx}>{user.name}</p>
                })}
              </>
            }

            <button onClick={() => register()}>Click to register</button>
            <button onClick={() => logOut()}>Click to logout</button>
          
        </div>
     );
}
 
export default Home;