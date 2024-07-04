import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { saveUserData, getUserData } from "../../utils/storageUtils";

export const ProfilScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await getUserData();
      if (savedUser) {
        setUser(savedUser);
      } else {
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser);
            saveUserData(firebaseUser);
          }
        });
      }
    };

    checkUser();
  }, []);

  const goToWomenHairstyles = async () => {
    nav.navigate("WomenScreen", { hairStyle: "Women" });
  };
  const goToMenHairstyles = async () => {
    nav.navigate("MenScreen", { hairStyle: "Men" });
  };
  const goToMyBookings = async () => {
    nav.navigate("MyBookings");
  };


  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Text style={styles.welcomeText}>Welcome, {user.email}!</Text>
          <TouchableOpacity style={styles.card} onPress={goToWomenHairstyles}>
            <View style={styles.cardInner}>
              <Image
                source={require("../../assets/women_hairstyles.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Women Hairstyles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={goToMenHairstyles}>
            <View style={styles.cardInner}>
              <Image
                source={require("../../assets/men_hairstyles.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Men Hairstyles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={goToMyBookings}>
            <View style={styles.cardInner}>
              <Image
                source={require("../../assets/my_bookings.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>My Bookings</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f0",
  },
  scrollViewContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c365d",
    marginVertical: 20,
    textAlign: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  cardInner: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5e3a",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ProfilScreen;