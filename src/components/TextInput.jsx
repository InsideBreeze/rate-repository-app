import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  form: {
    padding: 10,
    border: "1px",
    color: "gray",
    borderWidth: 1,
    borderColor: "gray",
    margin: 8,
    paddingLeft: 10,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    styles.form,
    {
      borderColor: error ? "#d73a4a" : "gray",
    },
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
