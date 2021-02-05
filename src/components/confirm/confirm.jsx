import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import config from "../../graphql/config"
import mutations from "../../graphql/mutations"
import { useMutation } from '@apollo/client';

const Confirm = (props) => {
    const value=queryString.parse(props.location.search);
    const token = value.token;
    const tokenId = value.tokenId;
    const [userId, setUserId] = useState(null);

    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    const [createUser] = useMutation(mutations.CREATE_USER);


    useEffect(() => {

        const confirmUser = async () => {
            try {
                const res = await config.app.emailPasswordAuth.confirmUser(token, tokenId);
                setConfirmSuccess(true);
                
            } catch (error) {
                console.log(error);
                setConfirmSuccess(false);
            }
           
        }
        confirmUser();
    }, [token, tokenId])



    return ( 
        <div>
            {isloading ? "Loading" : "Your account is now confirmed!"}
        </div>
     );
}
 
export default Confirm;
