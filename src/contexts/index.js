import { createContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import queries from "../graphql/queries";
import { useRealmApp } from "../RealmApp";

const Context = createContext();
const Provider = ({ children }) => {
    const [user, setUser] = useState({});
    

    return (
      <Context.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </Context.Provider>
    )
  };
  
  export { Provider, Context};