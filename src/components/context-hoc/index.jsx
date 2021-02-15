import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Context } from '../../contexts';
import queries from '../../graphql/queries';
import {useRealmApp} from "../../RealmApp"
import LoadingSpinner from '../loadingspinner';

const WithContextRoute = ({ component: Component, ...rest }) => {

    const app = useRealmApp();
    const id = app.currentUser.id;
    const {user, setUser} = useContext(Context);
    const [currentUser, setCurrentUser] = useState(user); 

    const [loadUser, {loading, data}] = useLazyQuery(queries.GET_USER, { 
        variables: { query: {_id: id } },
      }
    );

    useEffect(() => {
        if(Object.entries(currentUser).length < 1){
            loadUser();
        }
    }, [])

    useEffect(() => {
      if(data){
        setCurrentUser(data.user)
        setUser(data.user)
      }
    }, [data])

  return (
    <>
      {loading ? <LoadingSpinner color="text-blue-500" size={16}/> : <Route {...rest} render={
      props => <Component {...rest} {...props} />
    } />}
    </>
    
  )
}

export default WithContextRoute;