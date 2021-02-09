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
  mutation CreateUserProfile($project: ProjectInsertInput!) {
    insertOneProject(data: $project){
        _id
    }
  }
`;

export default {CREATE_USER, CREATE_USER_PROFILE, CREATE_PROJECT}
