import Banner from "@/components/Banner";
import HeaderDashboard from "@/components/HeaderDashboard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. Tipos de datos para el carrito
interface DetallePlastico {
  descripcion: string;
  puntos: number;
}

interface ItemCarrito {
  id: string;
  imagen: string;
  totalBotellas: number;
  detalles: DetallePlastico[];
}

//mock de ejemplo -> despues api
const MOCK_CARRITO: ItemCarrito[] = [
  {
    id: "1",
    imagen:
      "https://images.unsplash.com/photo-1528323273322-d81458248d40?w=400&q=80",
    totalBotellas: 6,
    detalles: [
      { descripcion: "4 pequeñas PET-1", puntos: 160 },
      { descripcion: "2 grandes PET-1", puntos: 120 },
    ],
  },
  {
    id: "2",
    imagen:
      "https://images.unsplash.com/photo-1605600659873-d808a1d85f8a?w=400&q=80",
    totalBotellas: 7,
    detalles: [
      { descripcion: "3 pequeñas PET-1", puntos: 120 },
      { descripcion: "4 grandes PET-1", puntos: 240 },
    ],
  },
  {
    id: "3",
    imagen:
      "https://images.unsplash.com/photo-1523293836414-f04e715e18a4?w=400&q=80",
    totalBotellas: 1,
    detalles: [{ descripcion: "1 pequeñas PET-1", puntos: 40 }],
  },
];

export default function CarritoScreen() {
  const router = useRouter();

  // Calculamos el total de puntos sumando todos los detalles de todos los items
  const totalPuntos = MOCK_CARRITO.reduce((accItem, item) => {
    const puntosItem = item.detalles.reduce(
      (accDetalle, detalle) => accDetalle + detalle.puntos,
      0,
    );
    return accItem + puntosItem;
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <HeaderDashboard />

        <Banner />

        {/* carrito -> estaria bueno componetizar*/}
        <Text style={styles.sectionTitle}>
          Actualmente tu carrito plástico tiene
        </Text>

        {MOCK_CARRITO.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.imagen }} style={styles.cardImage} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {item.totalBotellas} botellas plásticas
              </Text>

              {item.detalles.map((detalle, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    {detalle.descripcion}{" "}
                    <Text style={styles.pointsText}>
                      (+{detalle.puntos} pts)
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.totalText}>Total: {totalPuntos} pts</Text>

        {/*los botones -> componetizar y homogenizar con el escaneo  */}
        <View style={styles.actionRow}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push("/escanear")}
          >
            <Text style={styles.primaryButtonText}>ESCANEAR MÁS</Text>
            <Ionicons name="sync-circle-outline" size={20} color="#FFF" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => console.log("Notificar Recolector")}
          >
            <Text style={styles.secondaryButtonText}>NOTIFICAR RECOLECTOR</Text>
            <Ionicons name="bus-outline" size={20} color="#3FA9FF" />
          </Pressable>
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
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  //carrito
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#E6F4EA",
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
  },
  cardImage: {
    width: 110,
    height: "auto",
    minHeight: 100,
  },
  cardContent: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
    lineHeight: 18,
  },
  bulletText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
    lineHeight: 18,
  },
  pointsText: {
    color: "#FF8A65",
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 30,
  },

  //botones
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: "#3FA9FF",
    flexDirection: "row",
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  primaryButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
    marginRight: 5,
  },
  secondaryButton: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3FA9FF",
  },
  secondaryButtonText: {
    color: "#3FA9FF",
    fontWeight: "bold",
    fontSize: 12,
    marginRight: 5,
  },
});
