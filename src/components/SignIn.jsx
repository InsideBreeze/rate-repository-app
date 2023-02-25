import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

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

export const SignInContainer = ({ onSubmit }) => {
  const initalValues = {
    username: "",
    password: "",
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

const SignIn = () => {
  const navigate = useNavigate();

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return <SignInContainer onSubmit={onSubmit} />;
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: "white", padding: 20 }}>
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
