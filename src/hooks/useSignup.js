import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/queries";

const useSignup = () => {
  const [mutate] = useMutation(CREATE_USER);
  const signUp = async ({ username, password }) => {
    const result = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });
    return result;
  };
  return [signUp];
};

export default useSignup;
