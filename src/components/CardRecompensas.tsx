import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Recompensa {
  id: string;
  titulo: string;
  puntos: number;
  tipo: string;
  icono: string;
}

interface CardRecompensasProps {
  recompensasFiltradas: Recompensa[];
}
export default function CardRecompensas({
  recompensasFiltradas,
}: CardRecompensasProps) {
  return (
    <View style={styles.rewardsGrid}>
      {recompensasFiltradas.map((item) => (
        <View key={item.id} style={styles.rewardCard}>
          <View style={styles.rewardIconContainer}>
            <Ionicons name={item.icono as any} size={32} color="#6b9e59" />
          </View>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>{item.titulo}</Text>
            <Text style={styles.rewardType}>{item.tipo}</Text>
          </View>
          <View style={styles.rewardAction}>
            <Text style={styles.rewardCost}>{item.puntos} pts</Text>
            <TouchableOpacity style={styles.redeemButton}>
              <Text style={styles.redeemButtonText}>Canjear</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  /* --- TARJETAS DE RECOMPENSA --- */
  rewardsGrid: {
    flexDirection: "column",
  },
  rewardCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  rewardIconContainer: {
    backgroundColor: "#E6F0E0",
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  rewardType: {
    fontSize: 12,
    color: "#888",
  },
  rewardAction: {
    alignItems: "flex-end",
  },
  rewardCost: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6b9e59",
    marginBottom: 8,
  },
  redeemButton: {
    backgroundColor: "#A3C4D3",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  redeemButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
});
