import React from 'react';
import { useQuery } from "@apollo/client";
import queries from "../../graphql/queries";

const Home = () => {
    const { loading, data, error } = useQuery(queries.GET_USERS);

    console.log(data)
      
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR{console.log(error)}</p>;
    if (!data) return <p>Not found</p>;
      
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
          
        </div>
     );
}
 
export default Home;