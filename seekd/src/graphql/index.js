import gql from "graphql-tag";

export const GET_USERS = gql`
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

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($query: MovieQueryInput!, $set: MovieUpdateInput!) {
    updateOneMovie(query: $query, set: $set) {
      _id
      title
    }
  }
`;
