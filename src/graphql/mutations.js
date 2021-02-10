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
        _id,
        name
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

export default {CREATE_USER, CREATE_USER_PROFILE, CREATE_PROJECT, UPDATE_USER_ADD_PROJECT}
