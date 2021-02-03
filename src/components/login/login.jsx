import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {loginEmailPassword} from "../../graphql/auth";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import * as Realm from "realm-web";
import { useRealmApp } from "../../RealmApp"
import { TextInput } from '../../ui/TextInput';
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import Alert from '../../ui/Alert';

const Login = () => {

    const app = useRealmApp();
    const [mode, setMode] = useState('login');
    const [error, setError] = useState({});
    const handleLogin = async (email, password) => {
        try {
            await app.logIn(Realm.Credentials.emailPassword(email, password));
        } catch (err) {
            handleAuthenticationError(err, setError);
        }
    };
    

    const handleRegistrationAndLogin = async (email, password) => {
        // if (isValidEmailAddress) {
        // try {
        //     // Register the user and, if successful, log them in
        //     // await app.emailPasswordAuth.registerUser(email, password);
        //     return await handleLogin();
        // } catch (err) {
        //     // handleAuthenticationError(err, setError);
        // }
        // } else {
        //   // setError((err) => ({ ...err, email: "Email is invalid." }));
        // }
        try {
          console.log(email, password)
            await app.emailPasswordAuth.registerUser(email, password);
            return await handleLogin();
        } catch (error) {
            console.log((err) => ({ ...err, email: "Email is invalid." }))
        }
    };

    return ( 
        <>
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                 {mode === 'login' ? 'Sign in to your account' : 'Sign up for an account'}
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
                    const { email, password } = values;
                    if(mode === 'login'){
                      handleLogin(email, password);
                    }
                    else if(mode === 'signup'){
                      handleRegistrationAndLogin(email, password);
                    }
                    setSubmitting(false);
                  }}
                  validateOnChange
                >
                  {formik => (
                    <Form>
                      <div className="space-y-6">
                        <TextInput 
                          id="email"
                          label="Email address"
                          name="email"
                          type="email"
                          setError={setError}
                        />
                        <TextInput 
                          id="password"
                          label="Password"
                          name="password"
                          type="password"
                          setError={setError}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                              Remember me
                            </label>
                          </div>

                          <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Forgot your password?
                            </a>
                          </div>
                        </div>

                        <div>
                          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {formik.isSubmitting ? 'Loading' : `${mode === 'login' ? 'Sign in' : 'Sign up' }`}
                          </button>
                        </div>
                        <div className="flex justify-center" onClick={() => mode === 'login' ? setMode('signup') : setMode('login') }>
                              <p>{mode === 'login' ? 'Dont have an account? ' : 'Already have an account?' }</p>
                              <p className="cursor-pointer font-medium text-indigo-600 pl-1">{mode === 'login' ? 'Sign up' : 'Sign in' }</p>
                        </div>
                        
                        {error.password || error.email ? 
                        
                          <Alert 
                            type="error"
                            message={error.password || error.email}
                            hide={() => setError({})}
                          />
                        
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
 
export default Login;

function handleAuthenticationError(err, setError) {
    const { status, message } = parseAuthenticationError(err);
    const errorType = message || status;
    switch (errorType) {
      case "invalid username":
        setError((prevErr) => ({ ...prevErr, email: "Invalid email address." }));
        break;
      case "invalid username/password":
      case "invalid password":
      case "401":
        setError((err) => ({ ...err, password: "Incorrect password." }));
        break;
      case "name already in use":
      case "409":
        setError((err) => ({ ...err, email: "Email is already registered." }));
        break;
      case "password must be between 6 and 128 characters":
      case "400":
        setError((err) => ({
          ...err,
          password: "Password must be between 6 and 128 characters.",
        }));
        break;
      default:
        break;
    }
  }
  
  function parseAuthenticationError(err) {
    const parts = err.message.split(":");
    const reason = parts[parts.length - 1].trimStart();
    if (!reason) return { status: "", message: "" };
    const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
    const match = reason.match(reasonRegex);
    const { status, message } = match?.groups ?? {};
    return { status, message };
  }