import { useMutation } from "@apollo/client";
import { DELETE_REVIEW, GET_ME } from "../graphql/queries";

const useDeleteView = () => {
  const [mutate] = useMutation(DELETE_REVIEW, {
    refetchQueries: [
      {
        query: GET_ME,
        variables: {
          includeReviews: true,
        },
      },
    ],
  });

  const deleteReview = async (reviewId) => {
    await mutate({
      variables: {
        deleteReviewId: reviewId,
      },
    });
  };
  return [deleteReview];
};

export default useDeleteView;
