import { useAuth } from "../context/authContext";
import { useEffect, type ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import Home from "../pages/students/sHome";
import { Text, View } from "react-native";

// COMPOSANT
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, isAuth, initializing } = useAuth();
  const navigation = useNavigation<any>();
  if (initializing) {
    return (
      <View>
        <Text> Chargement... </Text>
      </View>
    );
  }
  console.log("ici");
  console.log(isAuth);

  if (token == null) {
    navigation.navigate("login");
  }
  return (<>
    {children}
  </>);
};
export default PrivateRoute;
