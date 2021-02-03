import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from "@apollo/client";
import config from "../../graphql/config"
import { useRealmApp } from "../../RealmApp"
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";

const Home = () => {
    // const { loading, data, error } = useQuery(queries.GET_USERS);

    // console.log(data)
    const app = useRealmApp();
    const id = app.currentUser.id;
    const [createUser] = useMutation(mutations.CREATE_USER);
    const [needsAccountSetup, setNeedsAccountSetup] = useState(true);
  
    const [getUser] = useLazyQuery(queries.GET_USER, {
      onCompleted: data => {
        console.log(data)
          if(data && data.user){
              console.log('exists')
          }
          else{
              console.log('doesnt exits')
              const _createUser = async () => {
                  const newUser = {
                      _id: id,
                      name: "From react",
                      info: {
                      skills: [],
                      socials: {
                          facebook: "",
                          instagram: "",
                          linkedin: "",
                          twitter: "",
                          website: "",
                          email: ""
                      },
                      bio: "",
                      cover_url: "",
                      employer: "",
                      img_url: "",
                      location: "",
                      }, 
                  }
                  const resp = await createUser({
                      variables: {
                        user: newUser,
                      }
                    });
                  console.log(resp);
              }
              _createUser();
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