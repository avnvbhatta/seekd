import React, { useEffect, useState } from 'react';
import { useRealmApp } from "../../RealmApp"
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import LoadingSpinner from '../../components/loadingspinner';
import Alert from '../../ui/Alert';
import mutations from "../../graphql/mutations";
import { useMutation, useQuery } from '@apollo/client';
import S3 from 'aws-s3';
import queries from "../../graphql/queries";
import Notification from "../../ui/Notification"
import { Link } from 'react-router-dom';
import {urlRegex} from "../../constants";
import uniquid from "uniqid";


const AddProject = (props) => {
    const app = useRealmApp();
    const id = app.currentUser.id;
    const [createProject] = useMutation(mutations.CREATE_PROJECT);
    const [updateUserAddProject] = useMutation(mutations.UPDATE_USER_ADD_PROJECT);
    const [updateProject] = useMutation(mutations.UPDATE_PROJECT);
    const { loading, data } = useQuery(queries.GET_CURRENT_PROJECTS, {
        variables: { query: {_id: id } }
    });


  
    const size1MB = 1024000;

    const [images, setImages] = useState([]);
    const [imagesError, setImagesError] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectDataLoading, setProjectDataLoading] = useState(true);
    const [imagesNeedUpdate, setImagesNeedUpdate] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET,
        dirName: process.env.REACT_APP_S3_PROJECTS_DIRECTORY, 
        region: process.env.REACT_APP_S3_REGION,
        accessKeyId: process.env.REACT_APP_S3_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_S3_ACCESS_SECRET_KEY,
    }
    const S3Client = new S3(config);

    
    const _initialValues =  {
        name: '',
        description: '',
        images: [],
        technologies: '',
        url: '',
        repository_url: '',
        likes: 0,
        user_id: id                                  
    }
    const [projectData, setProjectData] = useState(props && props.location && props.location.state ? props.location.state : null)
    const [initialValues, setInitialValues] = useState(_initialValues)


    useEffect(() => {
        if(projectData){
            setInitialValues({
                name: projectData.name,
                description: projectData.description,
                technologies: projectData.technologies.join(", "),
                url: projectData.url,
                repository_url: projectData.repository_url,
                likes: 0,
                user_id: id      
            })
            let _images = [];
            projectData && projectData.images.forEach((image,id) => {
                _images.push({id:id, fileName:`${id}.jpg`, url: image, isPhysicalFile: false});
            })
            setImages(_images)
            setProjectDataLoading(false);
        }
        else{
            setProjectDataLoading(false);
        }
    }, [])


    const uploadProjectImagesToS3 = async (file) => {
        const fileName = `project_image_${app.currentUser.id}_${uniquid()}`;
        if(file){
            try {
                return S3Client.uploadFile(file, fileName)
            } catch (error) {
                console.log(error)
            }   
        }
    }


    const handleImageUpload = (e) => {
        let files = e.target.files;
        let errors = [];
        let _images = [];
       
        let remainingSpots = 6 - images.length;
        remainingSpots = Math.min(remainingSpots, files.length);

        
        for(let i=0; i < remainingSpots; i++){
            if(files[i].size > size1MB){
                errors.push(`${files[i].name} failed to upload. Please make sure file is less than 1MB`);
            }
            else{
                _images.push({fileName: files[i].name, image: files[i], url: window.URL.createObjectURL(files[i]), isPhysicalFile: true});
            }
        }
      
        setImagesError(errors);
        setImages(prev => [...prev, ..._images]);
        setImagesNeedUpdate(true);
        

    }

    const deleteImg = (fileName) => {
        let _images = images.filter(image => image.fileName !== fileName);
        setImages(_images);
        setImagesNeedUpdate(true)
    }

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
                                images.length > 0 && 
                                    images.map((image, idx) => {
                                        return <div className={`relative rounded-md mr-4 mb-4`} key={idx}>
                                                <img className={`rounded-md w-20 h-20 `} src={image.url}/>
                                                <div className="absolute cursor-pointer -top-3 -right-3 h-6 w-6 bg-red-500 text-white rounded-full flex justify-center items-center">
                                                    <svg className="h-5 w-3"xmlns="http://www.w3.org/2000/svg" fill="none" 
                                                    onClick={() => deleteImg(image.fileName)}
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </div>
                                            </div>
                                })
                            }
                        </div>                      
                        { images.length > 5 ? null :
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
                            
                        {imagesError.map((error,idx) =>{
                            return <p key={idx} className="mt-2 text-sm text-red-500">{error}</p>
                        })}
                        
                    </div>
                    
                </div>
    }

    return ( 
        <>
            {projectDataLoading ? <LoadingSpinner color="text-blue-500" size={16}/>
            :
            <div className="min-h-screen bg-gray-50 flex flex-col pb-12 sm:px-6 lg:px-8 relative overflow-y-auto">
                <div className="mt-8 mx-auto w-full max-w-2xl">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues= {initialValues}
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
                                    technologies: Yup.string()
                                        .max(300, 'Technologies cannot exceed 300 characters') 
                                        .required('Required'),  
                                    url: Yup.string().matches(urlRegex, 'Invalid URL').required('Required'),
                                    repository_url: Yup.string().matches(urlRegex, 'Invalid URL'),                         
                                                                      
                                },
                                )
                            }
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                const _technologies = values.technologies.split(',').map(technology => technology = technology.trim().toLowerCase())
                                let newProject = {...values}


                                //Wait for amazon s3 uploads to handle s3's throttling
                                const wait = ms => new Promise(
                                    (resolve, reject) => setTimeout(resolve, ms)
                                );
                                let s3ImgUrls = [];
                                if(projectData){
                                    images.forEach(image => {
                                        if(!image.isPhysicalFile){
                                            s3ImgUrls.push(image.url)
                                        }
                                    });
                                }

                                const getS3URLs = async () => {

                                    for(let i=0; i< images.length; i++){
                                        await wait(1000);
                                        try {
                                            if(images[i].isPhysicalFile){
                                                console.log('uploading', images[i])
                                                const imageResponse = await uploadProjectImagesToS3(images[i].image);
                                                s3ImgUrls.push(imageResponse.location);
                                            }
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                }


                                try {
                                    console.log('s3urls before', s3ImgUrls);

                                    if(images && imagesNeedUpdate){
                                        await getS3URLs();
                                    }
                                    const currentDateTime = new Date().toISOString();
                                    console.log('s3urls after', s3ImgUrls);
                                    newProject = {...values, technologies:_technologies, images: s3ImgUrls, user_id: {link: id}, createDate: currentDateTime}
                                    
                                    if(!projectData){
                                        let createProjectResponse = await createProject({
                                            variables: {
                                                project: newProject,
                                            }
                                        });
                                        const createdProjectID = createProjectResponse.data.insertOneProject._id;
                                        setProjectName(values.name);
    
                                        let projectsArray = [];
                                        data.user.projects.forEach(project => projectsArray.push(project._id))
                                        const updateResponse = await updateUserAddProject({
                                            variables: {
                                                query: { _id: id },
                                                set: {
                                                   projects: {
                                                       link: [...projectsArray, createdProjectID]
                                                   } 
                                                }
                                            }
                                        });
                                    }
                                    else{
                                        const updateResponse = await updateProject({
                                            variables: {
                                                query: { _id: projectData._id },
                                                set: {
                                                   name: newProject.name,
                                                   description: newProject.description,
                                                   url: newProject.url,
                                                   repository_url: newProject.repository_url,
                                                   technologies: newProject.technologies,
                                                   images: newProject.images

                                                }
                                            }
                                        });
                                        console.log(updateResponse)
                                        setProjectName(updateResponse.data.updateOneProject.name);

                                    }
                                    if(!projectData){
                                        resetForm();
                                        setImages([]);
                                        setImagesError([]);
                                        setProjectName('');
                                    }
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
                                                    {projectData ? 'Edit Project' : 'Add Project'}
                                                </h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                    {projectData ? '' : 'Please tell us a bit more about yourself.'}
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
                                                <Link to="/manage-projects">
                                                    <button type="button" className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        Cancel
                                                    </button>
                                                </Link> 
                                            </div>
                                        </div>
                                        {success && <Notification title={`Successfully ${projectData ? 'updated' : 'created'} project!`} type="success" > <Link to={`/projects/${projectName}`}>Click here to view.</Link></Notification>}
                                        {error && <Notification title="Oops. Something went wrong." type="error" body={`An error occured. Please try again later.`}/>}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
    }
        </>
     );
}
 
export default AddProject;