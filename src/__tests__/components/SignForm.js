import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button

      const fn = jest.fn();
      render(<SignInContainer onSubmit={fn} />);

      fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");

      fireEvent.press(screen.getByText("Sign In"));
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
