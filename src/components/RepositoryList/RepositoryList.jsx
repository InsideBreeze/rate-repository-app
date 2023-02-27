import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import useRepositories from "../../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ search, setSearch, order, setOrder }) => {
  return (
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
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        search={props.search}
        order={props.order}
        setSearch={props.setSearch}
        setOrder={props.setOrder}
      />
    );
  };

  render() {
    const { repositories, redirect, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Pressable onPress={() => redirect(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const naviagate = useNavigate();

  const redirect = (id) => {
    naviagate(`/repositories/${id}`);
  };

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    order,
    searchKeyword: value,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (repositories) {
    return (
      <RepositoryListContainer
        onEndReach={onEndReach}
        repositories={repositories}
        order={order}
        setOrder={setOrder}
        search={search}
        setSearch={setSearch}
        redirect={redirect}
      />
    );
  }
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
