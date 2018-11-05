import { StackNavigator } from "react-navigation";
import App from "../components/index";

export const Route = StackNavigator(
  {
    App: { screen: App }
  },
  {
    title: "",
    headerMode: "float"
  }
);
