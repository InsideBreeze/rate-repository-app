import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  let orderBy;
  let orderDirection;

  switch (variables.order) {
    case "latest":
      orderBy = "CREATED_AT";
      break;
    case "highest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "DESC";
      break;
    default:
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
  }

  const { data, fetchMore, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      ...variables,
      orderBy,
      orderDirection,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return { repositories: data?.repositories, fetchMore: handleFetchMore };
};

export default useRepositories;
