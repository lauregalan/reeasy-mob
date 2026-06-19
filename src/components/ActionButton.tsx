import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ActionButton() {
  return (
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="cart-outline" size={28} color="#FFF" />
        <Text style={styles.actionButtonText}>Ver carrito</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.inviteButton]}>
        <Ionicons name="share-social-outline" size={28} color="#FFF" />
        <Text style={styles.actionButtonText}>Invita un amigo</Text>
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
  /* --- ACTIONS --- */
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#A3C4D3", // Azul claro del carrito
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
  },
  inviteButton: {
    backgroundColor: "#9FBCC8", // Tono ligeramente distinto
    marginRight: 0,
    marginLeft: 10,
  },
  actionButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
