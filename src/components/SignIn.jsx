import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
});

const validateSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const initalValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values.username, values.password);
  };
  return (
    <Formik
      initialValues={initalValues}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "white", padding: 20 }}>
      <Text>lala</Text>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ color: "white" }}
        >
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
