import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function GraphCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Un total de 21.42 kg CO2 ahorrado</Text>
      <View style={styles.divider} />

      <View style={styles.chartPlaceholder}>
        <Ionicons name="bar-chart-outline" size={60} color="#B0C4DE" />
        <Text style={styles.chartText}>gráfico de barras</Text>
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
  /* --- CARDS --- */
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 15,
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pointsText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  categoryText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 10,
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    height: 8,
    borderRadius: 4,
    marginRight: 30, // Para dejarle lugar a la medallita
  },
  progressBarFill: {
    backgroundColor: "#6b9e59", // Verde oscuro de la barra
    width: "75%", // Progreso simulado
    height: "100%",
    borderRadius: 4,
  },
  medalIcon: {
    position: "absolute",
    right: -35,
    top: -15,
  },
  /* --- CHART --- */
  chartPlaceholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
  },
  chartText: {
    color: "#666",
    marginTop: 10,
    fontWeight: "bold",
  },
  chartSubText: {
    color: "#999",
    fontSize: 12,
  },
});
