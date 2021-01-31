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

export default {GET_PROJECTS, GET_USERS}


