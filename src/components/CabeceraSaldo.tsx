import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function CabeceraSaldo() {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Tu saldo disponible</Text>
      <View style={styles.balanceRow}>
        <Ionicons name="leaf" size={28} color="#6b9e59" />
        <Text style={styles.balancePoints}>3350 pts</Text>
      </View>
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
  /* --- SALDO --- */
  balanceCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E6F0E0",
  },
  balanceTitle: {
    color: "#888",
    fontSize: 14,
    marginBottom: 5,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  balancePoints: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
});
