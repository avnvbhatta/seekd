import React, { useState } from 'react';
import { useRealmApp } from "../../RealmApp"
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import Alert from '../../ui/Alert';
import { TextInput } from '../../ui/TextInput';

const AlmostThere = () => {
    const app = useRealmApp();
    const [error, setError] = useState({});

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
                      email: '',
                      password: ''
                    }
                  }
                  validationSchema = {
                    Yup.object({
                        email: Yup.string()
                          .email('Invalid email address')
                          .required('Required'),
                        password: Yup.string()
                          .min(6, 'Password must be at least 6 characters')
                          .max(20, 'Password cannot exceed 20 characters')
                          .required('Required')
                      },
                    )
                  }
                  onSubmit={(values, { setSubmitting }) => {
                   //todo
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
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Name
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input type="text" name="first_name" id="first_name" autoComplete="given-name" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                                    </div>
                                </div>                               

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        City
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input type="text" name="city" id="city" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Country / Region
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select id="country" name="country" autoComplete="country" className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                        </select>
                                    </div>
                                </div>
                                

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <div className="flex items-center">
                                        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Change
                                        </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="cover_photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Cover photo
                                    </label>
                                    <div className="mt-2 sm:mt-0 sm:col-span-2">
                                        <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Bio
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <textarea id="about" name="about" rows="6" className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"></textarea>
                                        <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                                    </div>
                                </div>
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