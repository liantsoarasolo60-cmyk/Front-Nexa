import Navigation from "./pages/Navigation";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/privateRoute";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
