import React, { useState } from 'react';
import * as Realm from "realm-web";
import { useRealmApp } from "../../RealmApp"
import { TextInput } from '../../ui/TextInput';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import Alert from '../../ui/Alert';
import AppBadgeFull from "../../assets/logos/seekd-full.svg";

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
      
        try {
            await app.emailPasswordAuth.registerUser(email, password);
            return await handleLogin(email, password);
        } catch (error) {
            console.log((err) => ({ ...err, email: "Email is invalid." }))
        }
    };

    return ( 
        <>
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img className="mx-auto h-16 w-auto" src={AppBadgeFull} alt="Seekd"/>
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
                            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                              Remember me
                            </label>
                          </div>

                          <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                              Forgot your password?
                            </a>
                          </div>
                        </div>

                        <div>
                          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {formik.isSubmitting ? 'Loading' : `${mode === 'login' ? 'Sign in' : 'Sign up' }`}
                          </button>
                        </div>
                        <div className="flex justify-center" onClick={() => mode === 'login' ? setMode('signup') : setMode('login') }>
                              <p>{mode === 'login' ? 'Dont have an account? ' : 'Already have an account?' }</p>
                              <p className="cursor-pointer font-medium text-blue-600 pl-1">{mode === 'login' ? 'Sign up' : 'Sign in' }</p>
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