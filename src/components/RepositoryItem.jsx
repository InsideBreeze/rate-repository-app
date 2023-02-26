import { View, StyleSheet, Image, Pressable, Linking } from "react-native";
import theme from "../theme";
import Stats from "./Stats";
import Text from "./Text";

/*      {
    id: "rails.rails",
    fullName: "rails/rails",
    description: "Ruby on Rails",
    language: "Ruby",
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
  },
 */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "column",
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 5,
  },
  description: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 25,
    maxWidth: 300,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginTop: 8,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  githubButton: {
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
});

const RepositoryItem = ({ item, isSinglePage }) => {
  const openLink = () => {
    Linking.openURL(item.url);
  };
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.description}>
        <Image
          style={styles.image}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View style={styles.textContainer}>
          <Text
            style={{ marginBottom: 8 }}
            fontWeight="bold"
            fontSize="subheading"
          >
            {item?.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <Pressable style={styles.button}>
            <Text style={{ color: "white" }}>{item.language}</Text>
          </Pressable>
        </View>
      </View>
      {/* stars, forks */}
      <View style={styles.stats}>
        <Stats text="Stars" count={item.stargazersCount} />
        <Stats text="Forks" count={item.forksCount} />
        <Stats text="Reviews" count={item.reviewCount} />
        <Stats text="Rating" count={item.ratingAverage} />
      </View>
      {isSinglePage && (
        <Pressable style={styles.githubButton} onPress={openLink}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={{ color: "white" }}
          >
            Open in Github
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
