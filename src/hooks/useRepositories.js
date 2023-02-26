import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (order, searchKeyword) => {
  let orderBy;
  let orderDirection;

  switch (order) {
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
  console.log("orderBy", orderBy);
  console.log("direc", orderDirection);
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    },
  });

  return { repositories: data?.repositories };
};

export default useRepositories;
