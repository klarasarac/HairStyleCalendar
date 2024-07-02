import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDocs, query, limit } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth, db } from "../../firebase";
import Toast from "react-native-toast-message";
import Role from "../enums/user_role"

export const RegisterScreen: React.FC = () => {
  const [Ime, setFirstName] = useState("");
  const [Prezime, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Lozinka, setPassword] = useState("");
  const [Datum_rodjenja, setBirthDate] = useState("");
  const [Telefon, setPhoneNumber] = useState("");
  const [Spol, setGender] = useState("");

  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const goToLogin = async () => {
    nav.navigate("Login");
  };

  const createProfile = async (response: any, role:Role) => {
    const usersCollection = collection(db, "users");
    const userDoc = doc(usersCollection, response.user.uid);

    await setDoc(userDoc, {
      Ime,
      Prezime,
      Email,
      Telefon,
      Spol,
      Datum_rodjenja,
      role,  // Dodavanje uloge korisnika
    });

    console.log("User profile created successfully with role:", role);
  };

  const registerAndGoToMainFlow = async () => {
    if (
      !Ime ||
      !Email ||
      !Lozinka ||
      !Prezime ||
      !Telefon ||
      !Spol ||
      !Datum_rodjenja
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        Email,
        Lozinka
      );

      // Provera da li je ovo prvi korisnik koji se registruje
      const isFirstUser = (await getDocs(query(collection(db, "users"), limit(1)))).empty;

      createProfile(response, isFirstUser ? Role.Admin : Role.User);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setBirthDate("");
      setGender("");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "You have successfully registered",
      });
      goToLogin();
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.message || "Something went wrong",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        value={Ime}
        onChangeText={setFirstName}
        placeholder="First Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={Prezime}
        onChangeText={setLastName}
        placeholder="Last Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={Email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={Lozinka}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={Datum_rodjenja}
        onChangeText={setBirthDate}
        placeholder="Birth Date (DD.MM.YYYY)"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={Spol}
        onChangeText={setGender}
        placeholder="Gender"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={Telefon}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={registerAndGoToMainFlow}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f0",
  },
  title: {
    fontSize: 24,
    color: "#2c365d",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff5e3a",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#f2f2f0",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#2c365d",
    textAlign: "center",
  },
});

export default RegisterScreen;
