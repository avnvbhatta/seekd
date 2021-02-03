// React
import React from "react";
import { render } from "react-dom";
import App from "./App";
import './index.css';


// Wrap your app with an ApolloProvider
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);