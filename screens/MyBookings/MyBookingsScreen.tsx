import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import Toast from "react-native-toast-message";

export const MyBookingsScreen: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      Toast.show({
        type: 'success',
        text1: 'Booking Cancelled',
        text2: 'Your booking has been cancelled.'
      });
    } catch (e) {
      console.error("Error cancelling booking: ", e);
      Toast.show({
        type: 'success',
        text1: 'Booking Cancelled',
        text2: 'Your booking has been cancelled.'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <ScrollView contentContainerStyle={styles.bookingsContainer}>
        {bookings.length === 0 ? (
          <Text style={styles.noBookingsText}>You have no bookings.</Text>
        ) : (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingItem}>
              <Text style={styles.bookingText}>Service: {booking.service}</Text>
              <Text style={styles.bookingText}>Day: {booking.day}</Text>
              <Text style={styles.bookingText}>Time: {booking.time}</Text>
              <Text style={styles.bookingText}>Hair Style: {booking.hairStyle}</Text>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelBooking(booking.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c365d",
    textAlign: "center",
    marginBottom: 20,
  },
  bookingsContainer: {
    flexGrow: 1,
  },
  noBookingsText: {
    fontSize: 18,
    color: "#2c365d",
    textAlign: "center",
    marginTop: 20,
  },
  bookingItem: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  bookingText: {
    fontSize: 16,
    color: "#2c365d",
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: "#ff5e3a",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#f2f2f0",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});