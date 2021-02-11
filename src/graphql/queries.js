import gql from "graphql-tag";

const GET_PROJECTS = gql`
  query {
      projects {
        description
        images
        likes
        name
        repository_url
        technologies
        url
        user_id {
          name
          city
          img_url
          employer
        }
    }
  }
`;


const GET_PROJECT_BY_NAME =  gql`
query GetProjectByName($query: ProjectQueryInput!){
  project(query: $query){
    description
    images
    likes
    name
    repository_url
    technologies
    url
    user_id {
      name
      img_url
    }
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
      _id
      bio
      city
      country
      cover_url
      employer
      facebook
      img_url
      instagram
      linkedin
      name
      twitter
      website
      technologies
      projects {
        _id
        name
        description
        likes
        images
        url
        technologies
        repository_url
      }
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

export default {GET_PROJECTS, GET_USERS, GET_USER, GET_CURRENT_PROJECTS, GET_PROJECT_BY_NAME}


