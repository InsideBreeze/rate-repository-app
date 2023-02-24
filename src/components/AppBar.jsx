import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.appBar,
    paddingLeft: 14,
    paddingBottom: 20,
    flexDirection: "row",
    // ...
  },
  text: {
    color: "white",
    fontSize: theme.fontSizes.subheading,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Respositories" path="/" />
        <AppBarTab tabName="Sign In" path="/signIn" />
      </ScrollView>
      {/*  <Pressable style={{ marginRight: 10 }}>
        <Link to="/">
          <Text style={styles.text}>Respositories</Text>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/signIn">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </Pressable> */}
    </View>
  );
};

export default AppBar;
