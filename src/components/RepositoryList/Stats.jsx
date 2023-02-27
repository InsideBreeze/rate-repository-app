import { StyleSheet, View } from "react-native";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
});
const Stats = ({ text, count }) => {
  const i = count > 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
  return (
    <View style={styles.container}>
      <Text fontWeight="bold">{i}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

export default Stats;
