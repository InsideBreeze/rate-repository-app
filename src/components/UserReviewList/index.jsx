import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, View } from "react-native";
import { GET_ME } from "../../graphql/queries";
import theme from "../../theme";
import { ReviewItem } from "../RepositoryPage";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewList = () => {
  const { data } = useQuery(GET_ME, {
    variables: {
      includeReviews: true,
    },
  });

  return (
    <View style={{ backgroundColor: theme.colors.bg }}>
      <FlatList
        data={data?.me.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item} isReviewPage />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default UserReviewList;
