import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CreateUser($user: UserInsertInput!) {
    insertOneUser(data: $user){
        _id
    }
  }
`;

export default {CREATE_USER}
