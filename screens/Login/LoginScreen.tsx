import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { auth, db, provider, signInWithPopup } from "../../firebase";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { doc, getDoc } from "firebase/firestore";
import Role from "../enums/user_role";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToAdminScreen = () => {
    nav.navigate("AdminScreen");
  };

  const goToRegistration = () => {
    nav.push("Register");
  };

  const goToHome =  () => {
    nav.navigate("Profil");
  };

  const getUserRole = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data().role : "user";
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Email and password are required.",
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = await getUserRole(user.uid);

      if (role === Role.Admin) {
        goToAdminScreen();
      } else {
        goToHome();
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const role = await getUserRole(user.uid);

      if (role === Role.Admin) {
        goToAdminScreen();
      } else {
        goToHome();
      }
    } catch (error: any) {
      console.error("Error during Google sign-in", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, styles.activeTab]}>Login</Text>
        <Pressable onPress={goToRegistration}>
          <Text style={styles.headerText}>Register</Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.googleButton} onPress={signInWithGoogle}>
        <Image source={require("../../assets/google.png")} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c2330",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    color: "#f2f2f0",
    marginHorizontal: 15,
  },
  activeTab: {
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#ff5e3a",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff5e3a",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#f2f2f0",
    fontSize: 18,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#2c365d",
    fontSize: 18,
    fontWeight: "bold",
  },
});
