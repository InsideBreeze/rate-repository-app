import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import theme from "../theme";
import useCreateView from "../hooks/useCreateView";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
    paddingVertical: 20,
    margin: 10,
  },
});

const validateSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("rating is required number between 0 and 100")
    .min(0)
    .max(100),
  review: yup.string(),
});

const CreateView = () => {
  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    review: "",
  };
  const naviage = useNavigate();

  const [createView] = useCreateView();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;
    try {
      const { data } = await createView({
        ownerName,
        rating: parseInt(rating),
        repositoryName,
        text: review,
      });
      naviage(`/repositories/${data.createReview.repositoryId}`);
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
      {({ handleSubmit }) => <CreateViewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateViewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ color: "white" }}
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateView;
