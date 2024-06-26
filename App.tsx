import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./screens/HomePage/HomePage";
import { RegisterScreen } from "./screens/Register/RegisterScreen";
import { LoginScreen } from "./screens/Login/LoginScreen";
import ProfilScreen from "./screens/Profil/ProfilScreen";
import WomenScreen from "./screens/WomenScreen/WomenScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
          component={WomenScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
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
