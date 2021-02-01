// React
import React from "react";
import { render } from "react-dom";
// Apollo
import {
  ApolloProvider,
} from "@apollo/client";
import config from "./graphql/config"
import App from "./App";



// Wrap your app with an ApolloProvider
render(
  <ApolloProvider client={config.client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);