import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderDashboard() {
  return (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/44.jpg",
          }}
          style={styles.avatar}
        />
        <View style={styles.headerTexts}>
          <Text style={styles.greeting}>Hola Simona Sposito!</Text>
          <Text style={styles.subtitle}>
            ¿Listo para hacer la{" "}
            <Text style={styles.underline}>diferencia</Text>?
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bellButton}>
        <Ionicons name="notifications-outline" size={24} color="#555" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FFF2",
  },
  container: {
    padding: 20,
  },
  /* --- HEADER --- */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  headerTexts: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  underline: {
    textDecorationLine: "underline",
  },
  bellButton: {
    backgroundColor: "#E6F0E0",
    padding: 10,
    borderRadius: 20,
  },
});
