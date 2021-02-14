import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingSpinner from '../../components/loadingspinner';
import ProfileDetail from '../../components/profile-detail';
import { Context } from "../../contexts";
import queries from '../../graphql/queries';
import Avatar from "../../ui/Avatar";

const Profile = () => {
    const { user } = useContext(Context);
    
    const history = useHistory();
    const userID = history.location.pathname.split("/")[2];

    const [currentUser, setCurrentUser] = useState({});

    const [loadUser, {loading, data}] = useLazyQuery(queries.GET_USER, { 
        variables: { query: {_id: userID } },
        
      }
    );

    useEffect(() => {
        if(userID){
            loadUser();
        }
        else{
            setCurrentUser(user)
        }
    }, [currentUser])

    useEffect(() => {
        if(data){
            setCurrentUser(data.user)
        }
    }, [data])


    return ( 

        <>
            {
            Object.entries(currentUser).length < 1 ? <LoadingSpinner color="text-blue-500" size="16"/> 
            :
            <ProfileDetail user={currentUser}/>
            }
        </>
          
     );
}
 
export default Profile;