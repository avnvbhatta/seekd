import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery, ApolloProvider } from "@apollo/client";
import config from "../../graphql/config"
import { useRealmApp } from "../../RealmApp"
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import AlmostThere from '../almost-there/almost-there';

const Home = () => {
    // const { loading, data, error } = useQuery(queries.GET_USERS);

    // console.log(data)
    const app = useRealmApp();
    const id = app.currentUser.id;
    const email = app.currentUser._profile.data.email;
    const [createUser] = useMutation(mutations.CREATE_USER);
    const [needsAccountSetup, setNeedsAccountSetup] = useState(true);
  
    const [getUser] = useLazyQuery(queries.GET_USER, {
      onCompleted: data => {
        console.log(data)
          if(!data.user){
            const _createUser = async () => {
            const newUser = {
                _id: id,
                name: '',
                email: email
            }
            console.log('newuser', newUser)
            const resp = await createUser({
                variables: {
                  user: newUser,
                }
              });
              console.log(resp);
              
            }
            _createUser();
            setNeedsAccountSetup(true);
          }
          else{
              data.user && data.user.name ? setNeedsAccountSetup(false) : setNeedsAccountSetup(true);
          }
      }
    })

      
    const logOut = async () => {
      try {
        await app.logOut();
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      console.log('ue id', id)
      getUser({ variables: { query: {_id: id } } } )
    }, [])

    if(needsAccountSetup){
      return <AlmostThere />
    }

    return ( 
        <div>
            This is homesss
            <p className="bg-blue-500 text-3xl">Testing tailwind</p>
            {/* {loading ? <div>Loading...</div> :
              <>
                { data && data.users.map((user,idx) => {
                return <p key={idx}>{user.name}</p>
                })}
              </>
            }

            <button onClick={() => register()}>Click to register</button>
            <button onClick={() => logOut()}>Click to logout</button> */}
            <button onClick={() => logOut()}>Log out</button>
          
        </div>
     );
}
 
export default Home;