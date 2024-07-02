import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./screens/HomePage/HomePage";
import { RegisterScreen } from "./screens/Register/RegisterScreen";
import { LoginScreen } from "./screens/Login/LoginScreen";
import  ProfilScreen from "./screens/Profil/ProfilScreen";
import { WomenScreenCopy } from "./screens/WomenScreen/WomenScreenCopy";
import { MenScreen} from "./screens/MenScreen/MenScreen";
import { MyBookingsScreen } from "./screens/MyBookings/MyBookingsScreen";
import  Toast  from 'react-native-toast-message';
import { RootSiblingParent } from 'react-native-root-siblings';
import AdminScreen from "./screens/AdminScreen/AdminScreen";


export type RootStackParamList = {
  WomenScreen: { hairStyle: "Women" };
  MenScreen: { hairStyle: "Men" };
};

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <RootSiblingParent>
    <NavigationContainer>
    
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
          name="Profil"
          component={ProfilScreen}
          options={{
            title: "Profile",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
          name="WomenScreen"
          component={WomenScreenCopy}
          options={{
            title: "Hairstyles",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
          name="MenScreen"
          component={MenScreen}
          options={{
            title: "Hairstyles",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
      
        <Stack.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{
          title: "My Bookings",
          headerShown: true,
          headerTintColor: "#ff5e3a",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "rgb(28 35 48)",
          },
        }}
        />
        <Stack.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{
            title: "Admin Profile",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
     
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
