import React, { useState } from 'react';
import { useRealmApp } from "../../RealmApp"
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import S3 from 'aws-s3';

const AlmostThere = () => {
    const app = useRealmApp();
    const [error, setError] = useState({});
    const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET,
        dirName: process.env.REACT_APP_S3_DIRECTORY, 
        region: process.env.REACT_APP_S3_REGION,
        accessKeyId: process.env.REACT_APP_S3_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_S3_ACCESS_SECRET_KEY,
    }
    const S3Client = new S3(config);

    const size1MB = 1024000;

    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const [tempProfilePic, setTempProfilePic] = useState(null);
    const [imgError, setImgError] = useState(false);
    const [tempCoverPic, setTempCoverPic] = useState(null);
    const [coverImgError, setCoverImgError] = useState(false);

    const handleImageUpload = (e, imgType) => {

        if(imgType === 'profile'){
            if(e.target.files[0].size > size1MB){
                setImgError(true);
            }
            else{
                setImgError(false);
                setProfilePic(e.target.files[0])
                setTempProfilePic(window.URL.createObjectURL(e.target.files[0]))
            }
        }
        else{
            if(e.target.files[0].size > size1MB*5){
                setCoverImgError(true);
            }
            else{
                setCoverImgError(false);
                setCoverPic(e.target.files[0])
                setTempCoverPic(window.URL.createObjectURL(e.target.files[0]))
            }
        }
    }

    const uploadProfilePicToS3 = async (file, uploadType) => {
        const fileName = `${uploadType === 'profile' ? 'profile_img_' : 'cover_img_'}${app.currentUser.id}`;
        if(file){
            try {
                return S3Client.uploadFile(file, fileName)
            } catch (error) {
                console.log(error)
            }   
            console.log(file)
        }
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
                            className={`max-w-lg block w-full shadow-sm  sm:max-w-xs sm:text-sm rounded-md  
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
                    {label === 'Bio' && <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>}
                    {label === 'Technologies' && <p className="mt-2 text-sm text-gray-500">What technologies are you familiar with? Example: React, Angular, Node etc.</p>}
                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                </div>
            </div> 
          </>
        );
    };

    const Social = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
          <>
            <div className="mt-1">
                <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                    {label} 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                        type="text" 
                        name={props.name}
                        {...field} {...props}
                        className={`max-w-lg block w-full shadow-sm  sm:max-w-xs sm:text-sm rounded-md  
                        ${meta.touched && meta.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500' } `}/>
                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                </div>
            </div>
          </>
        );
    };

    const Country = ({ ...props }) => {
        const [field, meta] = useField(props);

        return <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Country / Region
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select 
                            name="country" 
                            autoComplete="country" 
                            {...field} {...props}
                            className={`max-w-lg block w-full shadow-sm  sm:max-w-xs sm:text-sm rounded-md  
                            ${meta.touched && meta.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500' } `}>
                                <option value="">Select a country</option>
                                <option value="us">United States</option>
                                <option value="canada">Canada</option>
                                <option value="mexico">Mexico</option>
                        </select>
                        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                    </div>
                </div>
    }

    const Socials = () => {
        return <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="socials" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Socials
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <Social label="Personal Website" name="website"/>  
                        <Social label="LinkedIn" name="linkedin"/>  
                        <Social label="Facebook" name="facebook"/>  
                        <Social label="Twitter" name="twitter"/>  
                        <Social label="Instagram" name="instagram"/>  
                    </div>
                </div>
    }

    const ProfilePic = () => {
        return <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                        Photo
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="flex items-center">
                        {
                            tempProfilePic ? 
                            <img className="h-12 w-12 rounded-full overflow-hidden " src={tempProfilePic}/>
                                :
                            <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                        }
                        <label className="ml-5 cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span>Change</span>
                                <input id="profile-pic-upload" name="profile-pic-upload" type="file" className="sr-only" onChange={e => handleImageUpload(e, 'profile')}/>
                        </label>
                        {tempProfilePic ?
                            <div className="text-red-500 ml-2 cursor-pointer" onClick={() => setTempProfilePic(null)}>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div> : null}


                        </div>
                        {imgError && <p className="mt-2 text-sm text-red-500">Please upload an image smaller than 1MB.</p>}
                    </div>
                </div>
    }

    const CoverPic = () => {
        return <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="cover_photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Cover photo
                    </label>
                    <div className="mt-2 sm:mt-0 sm:col-span-2 relative">
                        {tempCoverPic && 
                            <img className="rounded-md w-full h-36 overflow-hidden" src={tempCoverPic}/>
                        }
                        
                            {tempCoverPic ? 
                            <div className="flex items-center mt-4">
                                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span>Change</span>
                                        <input id="cover-pic-upload" name="cover-pic-upload" type="file" className="sr-only" onChange={e => handleImageUpload(e, 'cover')}/>
                                </label>

                                <div className="text-red-500 ml-2 cursor-pointer" onClick={() => setTempCoverPic(null)}>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            
                            :
                            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <div>
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                        <label htmlFor="cover-pic-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            {tempCoverPic ? null : <span>Upload a file</span>}
                                            <input id="cover-pic-upload" name="cover-pic-upload" type="file" className="sr-only" onChange={e => handleImageUpload(e, 'cover')} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                            
                        {coverImgError && <p className="mt-2 text-sm text-red-500">Please upload an image smaller than 5MB.</p>}
                        
                    </div>
                    
                </div>
    }

    const logOut = async () => {
        try {
          await app.logOut();
        } catch (error) {
          console.log(error)
        }
      }
    return ( 
        <>
        <div className="flex bg-gray-50 flex-row justify-end">
            <button onClick={() => logOut()}>Log out</button>
        </div>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 mx-auto w-full max-w-2xl">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
                  initialValues= {
                    {
                      name: '',
                      city: '',
                      country: '',
                      img_url: '',
                      cover_url: '',
                      bio: '',
                      employer: '',
                      skills: '',
                      website: '',
                      linkedin: '',
                      twitter: '',
                      instagram: '',
                      facebook: ''
                    }
                  }
                  validationSchema = {
                      
                    Yup.object({
                        name: Yup.string()
                            .min(1, 'Name must be at least 1 character')
                            .max(64, 'Name cannot exceed 64 characters')
                            .required('Required'),
                        city: Yup.string()
                            .min(1, 'City must be at least 1 character')
                            .max(96, 'City cannot exceed 96 characters')
                            .required('Required'),
                        country: Yup.string()
                            .oneOf(
                            ['us', 'canada', 'mexico'],
                            'Invalid Country'
                            )
                            .required('Required'),
                        employer: Yup.string()
                            .min(1, 'Employer must be at least 1 character')
                            .max(96, 'Employer cannot exceed 96 characters'),
                        bio: Yup.string()
                            .max(300, 'Bio cannot exceed 300 characters')
                            .required('Required'),
                        technologies: Yup.string()
                            .max(300, 'Technologies cannot exceed 300 characters'),
                        website: Yup.string().matches(URL, 'Invalid URL'),
                        facebook: Yup.string().matches(URL, 'Invalid URL'),
                        twitter: Yup.string().matches(URL, 'Invalid URL'),
                        instagram: Yup.string().matches(URL, 'Invalid URL'),
                        linkedin: Yup.string().matches(URL, 'Invalid URL'),
                      },
                    )
                  }
                  onSubmit={async (values, { setSubmitting }) => {
                   //todo
                    console.log(values);
                    const profilePicResponse = await uploadProfilePicToS3(profilePic, 'profile');
                    const coverPicResponse = await uploadProfilePicToS3(coverPic, 'cover');
                    
                    const formData = {...values, img_url: profilePicResponse.location, cover_url: coverPicResponse.location}
                    console.log(formData);

                  }}
                  
                >
                  {formik => (
                    <Form>
                        <div className="space-y-8 ">
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Almost There!
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Please tell us a bit more about yourself
                                </p>
                            </div>

                            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                <MyTextInput label="Name" name="name" type="text"/>                               
                                <MyTextInput label="City" name="city" type="text"/>                               
                                <Country name="country" />
                                <ProfilePic />
                                <CoverPic />
                                <MyTextInput label="Employer" name="employer" type="text"/>                               
                                <MyTextInput label="Bio" name="bio" type="textarea"/>                               
                                <MyTextInput label="Technologies" name="technologies" type="textarea"/>                               
                                <Socials />
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Cancel
                                </button>
                                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Save
                                </button>
                            </div>
                        </div>
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
 
export default AlmostThere;