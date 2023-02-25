import { useApolloClient, useMutation } from "@apollo/client";
import { useAuthStorage } from "../contexts/AuthStorageContext";
import { LOGIN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: {
        input: {
          username,
          password,
        },
      },
    });

    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    client.resetStore();
    return result;
  };
  return [signIn, result];
};

export default useSignIn;
