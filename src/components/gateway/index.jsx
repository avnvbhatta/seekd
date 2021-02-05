import React, { useEffect, useState } from 'react';
import { useRealmApp } from "../../RealmApp"
import LoadingSpinner from '../loadingspinner';
import Home from "../home/home"
import { useQuery } from '@apollo/client';
import queries from "../../graphql/queries";
import AlmostThere from '../almost-there/almost-there';

const Gateway = () => {
    const app = useRealmApp();
    const id = app.currentUser.id;

    const { loading, data } = useQuery(queries.GET_USER, {
        variables: { query: {_id: id } }
    });

    if(loading){
        return <LoadingSpinner color="blue-50"/>
    }

    if(data && data.user && data.user.name){
        return <Home />
    }

    return  <AlmostThere /> ;
}
 
export default Gateway;