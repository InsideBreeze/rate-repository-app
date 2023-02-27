import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";
import AppBarTab from "./AppBarTab";
import { useUserContext } from "../../contexts/UserContext";
import LogoutBar from "./LogoutBar";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.appBar,
    paddingLeft: 14,
    paddingBottom: 20,
    flexDirection: "row",
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBar = () => {
  const user = useUserContext();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Respositories" path="/" />
        {!user && <AppBarTab tabName="Sign In" path="/signIn" />}
        {user && <AppBarTab tabName="Create a review" path="/create_view" />}
        {user && <AppBarTab tabName="My reviews" path="/my_reviews" />}
        {user && <LogoutBar />}
        {!user && <AppBarTab tabName="Sign up" path="/signUp" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
