import gql from "graphql-tag";

const GET_PROJECTS = gql`
  query {
      projects {
        _id
        comments
        description
        images
        likes
        name
        project_id
        repository_url
        technologies
        url
    }
  }
`;

const GET_USERS = gql`
  query {
      users {
       name
       info {
           bio
       }
       projects{
           name
           url
       }
    }
  }
`;

const GET_USER = gql`
  query GetUser($query: UserQueryInput!){
    user(query: $query){
       _id,
       name
    }
  }
`;

const GET_CURRENT_PROJECTS = gql`
  query GetCurrentProjects($query: UserQueryInput!){
    user(query: $query){
      projects {
        _id
      }
    }
  }
`;

export default {GET_PROJECTS, GET_USERS, GET_USER, GET_CURRENT_PROJECTS}


