import { Pressable } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import { Link } from "react-router-native";

const AppBarTab = ({ tabName, path }) => {
  return (
    <Pressable style={{ paddingHorizontal: 15 }}>
      <Link to={path}>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.fontSizes.subheading,
          }}
        >
          {tabName}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
