import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingRight: 50,
    flexDirection: "row",
    backgroundColor: "white",
  },
  rating: {
    borderRadius: 25,
    width: 45,
    height: 45,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    flexDirection: "column",
    marginHorizontal: 15,
  },
  separator: {
    height: 10,
  },
  commentor: {
    marginBottom: 3,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold" fontSize="subheading">
          {review.node.rating}
        </Text>
      </View>
      <View style={styles.comment}>
        <View style={styles.commentor}>
          <Text fontWeight="bold" fontSize="subheading">
            {review.node.user.username}
          </Text>
          <Text color="textSecondary">
            {format(Date.parse(review.node.createdAt), "d.MM.yyyy")}
          </Text>
        </View>
        <View>
          <Text>{review.node.text}</Text>
        </View>
      </View>
    </View>
  );
};
const RepositoryPage = () => {
  const id = useParams().id;
  const { repository } = useRepository(id);

  /* repository.reviews.edges are review array */

  if (repository) {
    return (
      <FlatList
        data={repository.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ node }) => node.id}
        ListHeaderComponent={
          <>
            <RepositoryItem item={repository} isSinglePage={true} />
            <ItemSeparator />
          </>
        }
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }

  /*  <RepositoryItem item={repository} isSinglePage={true} />; */
};

export default RepositoryPage;
