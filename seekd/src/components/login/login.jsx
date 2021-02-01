import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {loginEmailPassword} from "../../graphql/auth";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";

const Login = () => {
    const [createUser] = useMutation(mutations.CREATE_USER);
    const [userId, setUserId] = useState(null);
    const [getUser] = useLazyQuery(queries.GET_USER, {
        onCompleted: data => {
            if(data && data.user._id){
                console.log('exists')
            }
            else{
                console.log('doesnt exits')
                const _createUser = async () => {
                    const newUser = {
                        _id: userId,
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

    const login = async () => {
        try {
            const res = await loginEmailPassword('avnvbhatta@gmail.com', 'Pa55w0rd');
            const {id} = res;
            console.log(id)
            setUserId(id);
            
           

            getUser({ variables: { query: {_id: id } } } )
            
            // if(userId){
            //     //user exists
            //     console.log('user exists')
            // }
            // else{
            //     console.log('user doesnt exist, inserting')

            //     // _createUser();
            // }


            console.log(userId)
        } catch (error) {
            
        }
    }

    // useEffect(() => {

    // }, [userId])
    return ( 
        <div>
            <h1>Login</h1>

            <button onClick={() => login()}>Click to login</button>
            {userId && <p>User is {userId}</p>}

        </div>
     );
}
 
export default Login;