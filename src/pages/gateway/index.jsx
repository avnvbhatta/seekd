import React, { useContext, useEffect } from 'react';
import { useRealmApp } from "../../RealmApp"
import LoadingSpinner from '../../components/loadingspinner';
import { useQuery } from '@apollo/client';
import queries from "../../graphql/queries";
import AlmostThere from '../almost-there';
import { Context } from '../../contexts';

const Gateway = ({children}) => {
    const app = useRealmApp();
    const id = app.currentUser.id;
    const {setUser} = useContext(Context); 

    const { loading, data } = useQuery(queries.GET_USER, {
        variables: { query: {_id: id } }
    });

    useEffect(() => {
        if(data && data.user && data.user.name){
            setUser(data.user);
        }
    }, [data])

    if(loading){
        return <div className="flex h-screen w-full justify-center items-center"><LoadingSpinner color="text-blue-500" size="16"/></div>
    }

    return data && data.user && data.user.name ? children : <AlmostThere />;
}
 
export default Gateway;