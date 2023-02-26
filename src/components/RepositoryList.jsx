import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  order,
  setOrder,
  search,
  setSearch,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const naviagate = useNavigate();

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <View style={{ margin: 15 }}>
            <Searchbar
              placeholder="search"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <SortingBar order={order} setOrder={setOrder} />
        </>
      )}
      renderItem={({ item }) => (
        <Pressable onPress={() => naviagate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      // ...
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);

  const { repositories } = useRepositories(order);

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
    />
  );
};

const SortingBar = ({ order, setOrder }) => {
  return (
    <View>
      <Picker
        selectedValue={order}
        onValueChange={(itemValue) => setOrder(itemValue)}
        prompt="Select an item..."
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export default RepositoryList;
