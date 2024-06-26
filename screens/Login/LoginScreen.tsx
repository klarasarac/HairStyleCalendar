import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
  Button,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import Toast from "react-native-toast-message";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToRegistration = () => {
    nav.push("Register");
  };

  const goToHome = async () => {
    nav.navigate("Profil");
  };

  const handleLogin = async () => {
    try {
      if (email && password) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Handle successful login
        goToHome();
        Keyboard.dismiss();
      } else {
        console.error("Email and password are required");
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Email and password are required'
        });
      }
    } catch (error:any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2:error.Message || 'Email or password is incorrect'
      });
    }
  };

  return (
    <Pressable style={styles.contentView}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Login</Text>
          </View>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              placeholderTextColor={"#ddd"} //
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address" //
              
            />
            
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              placeholderTextColor={"#ddd"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <View style={styles.buttonSeparator} /> {/* Razdvajanje dugmadi */}
            <Pressable style={styles.button} onPress={goToRegistration}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f0",
  },
  container: {
    width: "100%",
    maxWidth: 400,
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2c365d",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 50,
    fontSize: 18,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: "#272e4f",
    color: "#f2f2f0",
  },
  mainContent: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 50,
  },
  buttonSeparator: {
    height: 20,
  },
  button: {
    backgroundColor: "#ff5e3a",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#f2f2f0",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
