import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Context } from '../../contexts';
import queries from '../../graphql/queries';
import {useRealmApp} from "../../RealmApp"

const WithContextRoute = ({ component: Component, ...rest }) => {

    const app = useRealmApp();
    const id = app.currentUser.id;
    const {user, setUser} = useContext(Context); 

    const [loadUser] = useLazyQuery(queries.GET_USER, { 
        variables: { query: {_id: id } },
        onCompleted: data => {
          if(data){
            setUser(data.user);
          }
        }
      }
    );

    useEffect(() => {
        if(Object.entries(user).length < 1){
            loadUser();
        }
    }, [])

  return (
    <Route {...rest} render={
      props => <Component {...rest} {...props} />
    } />
  )
}

export default WithContextRoute;