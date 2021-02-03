import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {loginEmailPassword} from "../../graphql/auth";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import * as Realm from "realm-web";
import { useRealmApp } from "../../RealmApp"
import validator from "validator";

const Login = () => {

    const app = useRealmApp();
    // Toggle between logging users in and registering new users
    const [mode, setMode] = useState("login");
    const toggleMode = () => {
        setMode((oldMode) => (oldMode === "login" ? "register" : "login"));
    };

    // Keep track of form input state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Keep track of input validation/errors
    const [error, setError] = useState({});
    // Whenever the // Whenever the mode changes, clear the form inputs
    useEffect(() => {
        setEmail("");
        setPassword("");
        setError({});
    }, [mode]); 

    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        setError((e) => ({ ...e, password: null }));
        try {
            const res = await app.logIn(Realm.Credentials.emailPassword(email, password));
        } catch (err) {
            handleAuthenticationError(err, setError);
        }
    };

    const handleRegistrationAndLogin = async () => {
        const isValidEmailAddress = validator.isEmail(email);
        setError((e) => ({ ...e, password: null }));
        if (isValidEmailAddress) {
        try {
            // Register the user and, if successful, log them in
            await app.emailPasswordAuth.registerUser(email, password);
            return await handleLogin();
        } catch (err) {
            handleAuthenticationError(err, setError);
        }
        } else {
        setError((err) => ({ ...err, email: "Email is invalid." }));
        }
    };

    return ( 
        <div>
            <h1>Login</h1>
            <input
              type="email"
              label="Email"
              placeholder="your.email@example.com"
              onChange={(e) => {
                setError((e) => ({ ...e, email: null }));
                setEmail(e.target.value);
              }}
              value={email}
              state={
                error.email
                  ? "error"
                  : validator.isEmail(email)
                  ? "valid"
                  : "none"
              }
              errorMessage={error.email}
            />

            <input
              type="password"
              label="Password"
              placeholder="pa55w0rd"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              state={
                error.password ? "error" : error.password ? "valid" : "none"
              }
              errorMessage={error.password}
            />

            {mode === "login" ? (
              <button  onClick={() => handleLogin()}>
                Log In
              </button>
            ) : (
              <button
                onClick={() => handleRegistrationAndLogin()}
              >
                Register
              </button>
            )}
            
            <p>
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              </p>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleMode();
                }}
              >
                {mode === "login" ? "Register one now." : "Log in instead."}
              </div>

        </div>
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