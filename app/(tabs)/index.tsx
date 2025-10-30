import React from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import { deleteProfile } from "@redux/profileSlice";
import { useRouter } from "expo-router";

export default function HomePage() {
  const { profiles } = useSelector((state: RootState) => state.profiles);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Profiles</Text>

      {profiles.length === 0 ? (
        <Text>No profiles yet.</Text>
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.profileCard}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.phone}</Text>
              <Text style={styles.text}>{item.city}</Text>
              <View style={styles.buttonRow}>
                <Button
                  title="Edit"
                  onPress={() =>
                    router.push({
                      pathname: "/page1",
                      params: { ...item },
                    })
                  }
                />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => dispatch(deleteProfile(item.id))}
                />
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/page1")}>
        <Text style={styles.addButtonText}>+ Add Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16 },
  profileCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
