import { StyleSheet, Text, View } from "react-native";
import {
  useIsProfessor,
  useIsSignedOut,
  useIsStudent,
} from "../context/authContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import PrivateRoute from "../components/privateRoute";

import LoginScreen from "./auth/Login";
import RegisterScreen from "./auth/Register";
import salles from "./students/salles";
import sHome from "./students/sHome";
import AppNavigator from "./professor/TeaccherNav";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import pulication from "./professor/pulication";

const studentsTab = createBottomTabNavigator({
  initialRouteName: 'HomeStudents',
  screens: {
    HomeStudents: sHome,
    salle: salles,
  },
});

const professorTab = createBottomTabNavigator({
  initialRouteName:'HomeProfessor',
  screens: {
    HomeProfessor: sHome,
    cours: pulication,
  },
});

const rootStack = createNativeStackNavigator({
  groups: {
    auth: {
      if: useIsSignedOut,
      initialRouteName:'Login',
      screens: {
        Login: LoginScreen,
        Register: RegisterScreen,
      },
    },
    students: {
      if: useIsStudent,
      screens: {
        studentHome: {
          screen: studentsTab,
          options: { headerShown: false },
        },
      },
    },
    professor: {
      if: useIsProfessor,
      screens: {
        professortHome: {
          screen: AppNavigator,
          options: { headerShown: false },
        },
      },
    },
  },
});

const Navigation = createStaticNavigation(rootStack);
export default Navigation;