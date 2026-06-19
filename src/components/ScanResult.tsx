import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ApiOutput {
  date: string;
  data: Array<{
    type: string;
    amount: number;
  }>;
  image: string;
}

interface ScanResultProps {
  result: ApiOutput;
  onReset: () => void;
}

export default function ScanResult({ result, onReset }: ScanResultProps) {
  const totalItems = result.data.reduce((acc, curr) => acc + curr.amount, 0);
  const puntosGanados = totalItems * 40;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.resultContainer}>
        {/* card */}
        <View style={styles.infoBanner}>
          <View style={styles.bannerRow}>
            <Ionicons name="bulb" size={20} color="#FFC107" />
            <Text style={styles.bannerText}>
              Ahorrar 21 kg de CO2 evita producir hasta 12 kg de plástico nuevo.
            </Text>
          </View>
          <Text style={styles.bannerSubText}>
            ¡Tus acciones al reciclar hacen una gran diferencia!
          </Text>
        </View>

        {/* card de felicitacion */}
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>¡Felicidades!</Text>
          <View style={styles.divider} />

          <Text style={styles.detectText}>Se detectaron:</Text>
          {result.data.map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item.amount} plástico tipo: {item.type}{" "}
              <Text style={styles.pointsText}>(+{puntosGanados}pts)</Text>
            </Text>
          ))}

          {/* botones */}
          <TouchableOpacity style={styles.primaryButton} onPress={onReset}>
            <Text style={styles.primaryButtonText}>SEGUIR ESCANEANDO</Text>
            <Ionicons name="sync-circle-outline" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>NOTIFICAR RECOLECTOR</Text>
            <Ionicons name="bus-outline" size={24} color="#3FA9FF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FFF2",
  },
  resultContainer: {
    padding: 20,
  },
  infoBanner: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E6F0E0",
  },
  bannerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bannerText: {
    flex: 1,
    marginLeft: 10,
    color: "#555",
    fontSize: 13,
  },
  bannerSubText: {
    color: "#FF6B6B",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  successCard: {
    backgroundColor: "#E6F4EA",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    width: "100%",
    marginBottom: 20,
  },
  detectText: {
    fontSize: 16,
    color: "#333",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    color: "#555",
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  pointsText: {
    color: "#FF6B6B",
    fontWeight: "bold",
  },
  primaryButton: {
    backgroundColor: "#3FA9FF",
    flexDirection: "row",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3FA9FF",
  },
  secondaryButtonText: {
    color: "#3FA9FF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
