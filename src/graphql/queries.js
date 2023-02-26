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
    url
  }
`;
/* query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
    
  }
} */
export const GET_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetail
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAIL}
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;
