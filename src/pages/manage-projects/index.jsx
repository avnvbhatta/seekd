import React, { useContext, useEffect, useState } from 'react';
import Card from '../../components/card';
import { Context } from '../../contexts';
import mutations from "../../graphql/mutations";
import { useMutation } from '@apollo/client';
import { useRealmApp } from "../../RealmApp";
import Notification from  "../../ui/Notification";

const ManageProjects = () => {

    const {user, setUser} = useContext(Context);
    const app = useRealmApp();
    const id = app.currentUser.id;

    const [currentUser, setCurrentUser] = useState(user);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [deletingStatus, setDeletingStatus] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [updateUserProjectArray] = useMutation(mutations.UPDATE_USER_PROJECT_ARRAY);
    const [deleteUserProject] = useMutation(mutations.DELETE_PROJECT);


    const deleteProject = async (project_id) => {
        setDeletingStatus(true)
        try{
            const deleteUserProjectResponse = await deleteUserProject({
                variables: {
                  query: {
                    _id: project_id
                  }
                }
              });


            const updateUserProjectArrayResponse = await updateUserProjectArray({
                variables: {
                  input: {
                    project_id: project_id,
                    user_id: id
                  }
                }
              });
              setDeleteSuccess(true);
              let temp = currentUser.projects.filter(project => project._id !== project_id);
              setCurrentUser(user => ({...user, projects: temp}));
              setUser(user => ({...user, projects: temp}))

        }
        catch(err){
            console.log(err);
            setDeleteError(true);

        }
        setDeletingStatus(false);
        setShowDeleteAlert(false);

      }
    
      useEffect(() => {
      }, [deleteSuccess, deleteError])

      useEffect(() => {
          if(user){
              setCurrentUser(user);
          }

      }, [user])

 

    return ( 
    <div className="overflow-y-auto px-8 py-4">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl mb-2 ">
            <span className="inline">Manage</span>
            <span className="text-blue-500 xl:inline">Projects</span>
        </h1>
        {
            user && user.projects && user.projects.length > 0 ? 
            <>
                <div className="max-w-7xl mx-auto">
                    <div className="my-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none relative">
                        {user.projects.map((project, idx) => {
                            return <Card 
                                    manage={true} 
                                    project={project} 
                                    key={idx} 
                                    user={currentUser} 
                                    showDeleteAlert={showDeleteAlert}
                                    setShowDeleteAlert={setShowDeleteAlert}
                                    deleteProject={deleteProject}
                                    deletingStatus={deletingStatus}
                                    
                                />
                        })}
                    </div>
                </div>
            </>
            :
            <div className="flex  w-full mt-32 flex-col items-center">
                <svg className="h-64 w-64 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
                <p className="text-md md:text-2xl tracking-tight font-bold text-blue-200 text-center">
                    You do not appear to have any projects!
                    <br />
                    Once you upload a project, you can edit it here.    
                </p>   
            </div>
        }

            {deleteSuccess  && <Notification title="Successfully deleted project." type="success" ></Notification>}
            {deleteError  && <Notification title="Something went wrong." body="Please try again later." type="error" ></Notification>}
        
        
        
        
    </div>
    );
}
 
export default ManageProjects;