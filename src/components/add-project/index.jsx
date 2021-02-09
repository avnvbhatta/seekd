import React, { useEffect, useState } from 'react';
import { useRealmApp } from "../../RealmApp"
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import S3 from 'aws-s3';
import {countryList} from "../../constants"
import LoadingSpinner from '../loadingspinner';
import Home from "../home/home"
import Alert from '../../ui/Alert';
import mutations from "../../graphql/mutations";
import { useMutation } from '@apollo/client';

const AddProject = () => {
    const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    const [createProject] = useMutation(mutations.CREATE_PROJECT);
    const size1MB = 1024000;

    const [images, setImages] = useState(null);
    const [tempImages, setTempImages] = useState(null);
    const [imagesError, setImagesError] = useState(null);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [imgDeleteKey, setImgDeleteKey] = useState(null);

    const handleImageUpload = (e) => {
        let files = e.target.files;
        let errors = [];
        let _images = [];
        let _tempImages = [];
        for(let i=0; i<files.length; i++){
            if(files[i].size > size1MB){
                errors.push(`${files[i].name} failed to upload. Please make sure file is less than 1MB`);
            }
            else{
                _images.push(files[i]);
                _tempImages.push(window.URL.createObjectURL(files[i]));
            }
        }
      
        if(errors.length > 0){
            setImagesError(errors);
        }
        else{
            setImages(_images);
            setTempImages(_tempImages);
        }

    }

    // const deleteImg = (index) => {
    //     let _images = ima
    // }

    const MyTextInput = ({ label, type, ...props }) => {
        const [field, meta] = useField(props);
        return (
          <>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {label}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    {
                        type === 'text' ?
                        <input 
                            type="text"
                            name={props.name}
                            {...field} {...props}
                            className={`max-w-lg block w-full shadow-sm  sm:text-sm rounded-md  
                            ${meta.touched && meta.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500' } `}/>
                        :
                        <textarea 
                            type="text"
                            name={props.name}
                            {...field} {...props}
                            rows="6" 
                            className={`max-w-lg shadow-sm block w-full rounded-md 
                            ${meta.touched && meta.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500' } `}>
                            </textarea>
                                        
                    }
                    {label === 'Description' && <p className="mt-2 text-sm text-gray-500">What does your project do?</p>}
                    {label === 'Technologies' && <p className="mt-2 text-sm text-gray-500">What technologies did you use on your project? <br/> Examples: React, Python, Node, Django, etc.</p>}
                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                </div>
            </div> 
          </>
        );
    };



    const ProjectImages = () => {
        return <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="cover_photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Images
                    </label>
                    <div className="mt-2 sm:mt-0 sm:col-span-2 relative">
                        <div className="flex flex-row flex-wrap mb-4 divide-x">
                            {
                                tempImages && 
                                    tempImages.map((image, idx) => {
                                        return <div className={`relative rounded-md ${idx === imgDeleteKey ? 'bg-red-500' : ''}`} key={idx} onMouseEnter={() => setImgDeleteKey(idx)} onMouseLeave={() => setImgDeleteKey(null)}>
                                                <img className={`rounded-md w-20 h-20 ${idx === imgDeleteKey ? 'bg-red-400 opacity-25' : ''}`} src={image}/>
                                                {idx === imgDeleteKey &&
                                                    <svg className="absolute inset-7 h-6 w-6 mr-2 text-gray-50" 
                                                    // onClick={() => deleteImg(idx)}
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                }
                                                
                                            </div>
                                    })
                            }
                        </div>                      
                        { tempImages && tempImages.length > 5 ? null :
                        <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <div>
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                    <label htmlFor="cover-pic-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload images</span>
                                        <input id="cover-pic-upload" name="cover-pic-upload" type="file" className="sr-only" multiple onChange={e => handleImageUpload(e)}/>
                                    </label>
                                    <p className="pl-1">(maximum of 6)</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 1MB
                                    </p>
                                </div>
                            </div>
                        </div>}
                            
                        {imagesError && imagesError.map((error,idx) =>{
                            return <p key={idx} className="mt-2 text-sm text-red-500">Please upload images that are smaller than 1MB.</p>
                        })}
                        
                    </div>
                    
                </div>
    }

    return ( 
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col pb-12 sm:px-6 lg:px-8 relative">
                <div className="mt-8 mx-auto w-full max-w-2xl">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues= {
                                {
                                    name: '',
                                    description: '',
                                    images: [],
                                    technologies: '',
                                    url: '',
                                    repository_url: '',
                                    likes: 0,
                                    user_id: ''                                    
                                }
                            }
                            validationSchema = {
                                
                                Yup.object({
                                    name: Yup.string()
                                        .min(1, 'Name must be at least 1 character')
                                        .max(64, 'Name cannot exceed 64 characters')
                                        .required('Required'),
                                    description: Yup.string()
                                        .min(1, 'Description must be at least 1 character')
                                        .max(300, 'Description cannot exceed 300 characters')
                                        .required('Required'),
                                    images: Yup.string()
                                        .min(1, 'Name must be at least 1 character')
                                        .max(500, 'Name cannot exceed 500 characters'),
                                    technologies: Yup.string()
                                        .max(300, 'Technologies cannot exceed 300 characters') 
                                        .required('Required'),  
                                    url: Yup.string().matches(URL, 'Invalid URL').required('Required'),
                                    repository_url: Yup.string().matches(URL, 'Invalid URL'),                         
                                                                      
                                },
                                )
                            }
                            onSubmit={async (values, { setSubmitting }) => {
                            //todo
                                const _technologies = values.technologies.split(',').map(technology => technology = technology.trim())
                                let formData = {...values, technologies: _technologies }
                                try {

                                    // if(profilePic){
                                    //     const profilePicResponse = await uploadProfilePicToS3(profilePic, 'profile');
                                    //     formData = {...formData, img_url: profilePicResponse.location}
                                    // }
                                    
                                    // await createProject({
                                    //     variables: {
                                    //         project: newProject,
                                    //     }
                                    // });

                                    setSuccess(true);
                                } catch (error) {
                                    console.log(error)
                                    setError(true);
                                }

                                setSubmitting(false);

                            }}
                            
                            >
                            {formik => (
                                <Form>
                                    <div className="space-y-8 ">
                                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                Add Project
                                                </h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Please tell us a bit more about your project
                                                </p>
                                            </div>
                                            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                                <MyTextInput label="Name" name="name" type="text"/>                               
                                                <MyTextInput label="Description" name="description" type="textarea"/>    
                                                <ProjectImages />                           
                                                <MyTextInput label="Technologies" name="technologies" type="textarea"/>    
                                                <MyTextInput label="Project URL" name="url" type="text"/>    
                                                <MyTextInput label="Repository URL" name="repository_url" type="text"/>    
                                            </div>
                                        </div>

                                        <div className="pt-5">
                                            <div className="flex justify-end">
                                                <button type="submit" className="w-20 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    {formik.isSubmitting ? <LoadingSpinner color="white"/> : 'Save'}
                                                </button>
                                                <button type="button" className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                        {error ? 
                                            <div className="pt-5">
                                                <Alert 
                                                type="error"
                                                message="Oops. Something went wrong."
                                                hide={() => setError(false)}
                                                />
                                            </div>
                                        : null}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default AddProject;