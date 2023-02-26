import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { format } from "date-fns";
import useDeleteView from "../hooks/useDeleteView";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingRight: 50,
    flexDirection: "column",
    backgroundColor: "white",
  },
  commentContainer: {
    flexDirection: "row",
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  repositoryButton: {
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 20,
  },
  deleteButton: {
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: "red",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review, isReviewPage }) => {
  const naviagate = useNavigate();
  const [deleteReview] = useDeleteView();

  const handleDeleteReview = async (id) =>
    Alert.alert("Delete Review", "Are you sure to delete this review?", [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Canceled"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => await deleteReview(id),
        style: "destructive",
      },
    ]);
  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
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
      {isReviewPage && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.repositoryButton}
            onPress={() =>
              naviagate(`/repositories/${review.node.repositoryId}`)
            }
          >
            <Text color="white">View repository</Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDeleteReview(review.node.id)}
          >
            <Text color="white">Delete review</Text>
          </Pressable>
        </View>
      )}
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
