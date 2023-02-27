import { useApolloClient } from "@apollo/client";
import { Pressable } from "react-native";
import { useAuthStorage } from "../../contexts/AuthStorageContext";
import theme from "../../theme";
import Text from "../Text";

const LogoutBar = () => {
  const client = useApolloClient();

  const authStorage = useAuthStorage();
  const logout = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };

  return (
    <Pressable style={{ marginRight: 10 }} onPress={logout}>
      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.fontSizes.subheading,
        }}
      >
        Logout
      </Text>
    </Pressable>
  );
};

export default LogoutBar;
