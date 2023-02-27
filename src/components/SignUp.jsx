import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import useSignup from "../hooks/useSignup";
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
  username: yup.string().required("Username is required").min(1).max(30),
  password: yup.string().required("Password is required").min(5).max(50),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "password is not matched")
    .required("Password confirm is required"),
});

const SignUp = () => {
  const initialValues = {
    username: "",
    password: "",
    password_confirm: "",
  };
  const navigate = useNavigate();
  const [signUp] = useSignup();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({
        username,
        password,
      });
      await signIn({
        username,
        password,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="password_confirm"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ color: "white" }}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
