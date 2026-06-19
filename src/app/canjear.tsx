import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Datos de prueba (Mock data)
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

  // Filtramos la lista según la categoría seleccionada
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
        {/* 1. CABECERA DE SALDO */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Tu saldo disponible</Text>
          <View style={styles.balanceRow}>
            <Ionicons name="leaf" size={28} color="#6b9e59" />
            <Text style={styles.balancePoints}>3350 pts</Text>
          </View>
        </View>

        {/* 2. FILTROS RÁPIDOS */}
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

        {/* 3. LISTA DE RECOMPENSAS */}
        <Text style={styles.sectionTitle}>Recompensas Disponibles</Text>
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

        {/* Espacio para que el menú inferior no tape el contenido */}
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
