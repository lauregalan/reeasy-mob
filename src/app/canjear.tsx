import CabeceraSaldo from "@/components/CabeceraSaldo";
import CardRecompensas from "@/components/CardRecompensas";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// datos de prueba -> api
const RECOMPENSAS = [
  {
    id: "1",
    titulo: "20% Desc. en Supermercado",
    puntos: 1500,
    tipo: "Descuento",
    icono: "cart-outline",
  },
  {
    id: "2",
    titulo: "Termo de Acero Inoxidable",
    puntos: 3000,
    tipo: "Producto",
    icono: "water-outline",
  },
  {
    id: "3",
    titulo: "Plantar 1 Árbol Nativo",
    puntos: 800,
    tipo: "Donación",
    icono: "leaf-outline",
  },
  {
    id: "4",
    titulo: "Bolsa de Tela Ecológica",
    puntos: 1200,
    tipo: "Producto",
    icono: "bag-handle-outline",
  },
  {
    id: "5",
    titulo: "Envío Gratis en Logística",
    puntos: 500,
    tipo: "Servicio",
    icono: "bus-outline",
  },
];

export default function CanjearScreen() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const recompensasFiltradas =
    categoriaActiva === "Todos"
      ? RECOMPENSAS
      : RECOMPENSAS.filter((r) => r.tipo === categoriaActiva);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <CabeceraSaldo />

        {/* 2. FILTROS DE CATEGORÍA */}
        <Text style={styles.sectionTitle}>Categorías</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {["Todos", "Descuento", "Producto", "Donación"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterPill,
                categoriaActiva === cat && styles.filterPillActive,
              ]}
              onPress={() => setCategoriaActiva(cat)}
            >
              <Text
                style={[
                  styles.filterText,
                  categoriaActiva === cat && styles.filterTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recompensas Disponibles</Text>

        <CardRecompensas recompensasFiltradas={recompensasFiltradas} />

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
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
  /* --- FILTROS --- */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  filterPill: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterPillActive: {
    backgroundColor: "#6b9e59",
    borderColor: "#6b9e59",
  },
  filterText: {
    color: "#666",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#FFF",
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
