import React from 'react';
import Avatar from '../../ui/Avatar';
import LoadingSpinner from '../loadingspinner';

const CardUserMini = ({user}) => {

    if(!user){
        return <LoadingSpinner color="text-blue-500"  size={16}/>
    }
    return ( 

        <div class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
            <div class="flex-shrink-0">
                {user.img_url ? 
                    <img
                        className="h-10 w-10 rounded-full"
                        src={user.img_url}
                        alt="feature_image"
                    />
                    :
                    <Avatar size={10}/>
                }    
            </div>
            <div class="flex-1 min-w-0">
                <a href="#" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                <p class="text-sm font-medium text-gray-900">
                    {user.name}
                </p>
                <p class="text-sm text-gray-500 truncate">
                    {user.bio}
                </p>
                
                </a>
            </div>
        </div>
     );
}
 
export default CardUserMini;