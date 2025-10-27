import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Page2() {
  const { name, phone } = useLocalSearchParams<{ name: string; phone: string }>();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Address Info</Text>

      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
      <TextInput style={styles.input} placeholder="State" value={state} onChangeText={setState} />
      <TextInput style={styles.input} placeholder="Country" value={country} onChangeText={setCountry} />

      <View style={styles.buttonRow}>
        <Button title="Back" onPress={() => router.back()} />
        <Button
          title="Next"
          onPress={() =>
            router.push({
              pathname: "/page3",
              params: { name, phone, city, state, country },
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "80%",
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "60%", marginTop: 20 },
});
