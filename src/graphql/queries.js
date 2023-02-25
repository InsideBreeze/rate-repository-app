import { gql } from "@apollo/client";

const REPOSITORY_DETAIL = gql`
  fragment RepositoryDetail on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetail
        }
      }
    }
  }
  ${REPOSITORY_DETAIL}
`;

export const LOGIN = gql`
  mutation LOGIN($input: AuthenticateInput) {
    authenticate(credentials: $input) {
      accessToken
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      username
      id
    }
  }
`;
