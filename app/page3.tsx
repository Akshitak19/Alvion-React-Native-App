import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Page3() {
  const { name, phone, city, state, country } = useLocalSearchParams<{
    name: string;
    phone: string;
    city: string;
    state: string;
    country: string;
  }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>

      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Phone: {phone}</Text>
      <Text style={styles.text}>City: {city}</Text>
      <Text style={styles.text}>State: {state}</Text>
      <Text style={styles.text}>Country: {country}</Text>

      <View style={styles.buttonRow}>
        <Button title="Back" onPress={() => router.back()} />
        <Button title="Finish" onPress={() => router.push("/page1")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginVertical: 5 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "60%", marginTop: 20 },
});
