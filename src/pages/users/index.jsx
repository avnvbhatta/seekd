import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import queries from '../../graphql/queries';
import LoadingSpinner from '../../components/loadingspinner';
import Search from '../../components/search';
import Profile from '../profile';
import ProfileDetail from '../../components/profile-detail';

const Users = () => {

    const { loading, data } = useQuery(queries.GET_USERS);

    const [users, setUsers] = useState(null)
    const [searchedUsers, setSearchedUsers] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)


    useEffect(() => {
        if(data && data.users.length > 0){
            setUsers(data.users)
            setSearchedUsers(data.users)
            setCurrentUser(data.users[0]);
        }
    }, [data])

    return ( 
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            
            <div className="flex-1 relative z-0 flex overflow-hidden flex-col xl:flex-row">
            
                {loading && <LoadingSpinner color="text-blue-500" size="16"/> }
                {currentUser && users && <>
                    <Search type="user" label="Users" initial={users} setCurrent={setCurrentUser} searched={searchedUsers} setSearched={setSearchedUsers}/>
                    <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last" tabIndex="0">
                        <ProfileDetail user={currentUser} />
                    </div>
                </>}
            </div>
        </div>
    );
}
 
export default Users;