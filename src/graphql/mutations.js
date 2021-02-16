import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CreateUser($user: UserInsertInput!) {
    insertOneUser(data: $user){
        _id
    }
  }
`;

const CREATE_USER_PROFILE = gql`
  mutation CreateUserProfile($query: UserQueryInput!, $set: UserUpdateInput!) {
    updateOneUser(query: $query, set: $set){
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

const CREATE_PROJECT = gql`
  mutation CreateProject($project: ProjectInsertInput!) {
    insertOneProject(data: $project){
        _id
    }
  }
`;

const UPDATE_USER_ADD_PROJECT = gql`
  mutation UpdateUserAddProject($query: UserQueryInput!, $set: UserUpdateInput!) {
    updateOneUser(query: $query, set: $set){
        _id,
        name
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateUserAddProject($query: ProjectQueryInput!, $set: ProjectUpdateInput!) {
    updateOneProject(query: $query, set: $set){
        _id,
        name
    }
  }
`;
export default {CREATE_USER, CREATE_USER_PROFILE, CREATE_PROJECT, UPDATE_USER_ADD_PROJECT, UPDATE_PROJECT}
