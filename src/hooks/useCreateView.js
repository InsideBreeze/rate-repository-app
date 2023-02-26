import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";

const useCreateView = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  /*  "ownerName": null,
    "rating": null,
    "repositoryName": null,
    "text": null */
  const createView = async ({ ownerName, rating, repositoryName, text }) => {
    const result = await mutate({
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text,
        },
      },
    });
    return result;
  };
  return [createView, result];
};

export default useCreateView;
