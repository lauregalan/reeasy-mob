import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilScreen() {
  // Opciones de navegación del perfil
  const menuOptions = [
    { id: "1", title: "Mi Cuenta", icon: "person-outline" },
    { id: "2", title: "Historial de Reciclaje", icon: "leaf-outline" },
    { id: "3", title: "Estadísticas de Impacto", icon: "bar-chart-outline" },
    { id: "4", title: "Configuración", icon: "settings-outline" },
    { id: "5", title: "Ayuda y Soporte", icon: "help-circle-outline" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. CABECERA DEL PERFIL */}
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Laureano Facundo Galán</Text>
          <Text style={styles.category}>Categoría IV • Reciclador Activo</Text>
        </View>

        {/* 2. TARJETA DE ESTADÍSTICAS RÁPIDAS */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>56</Text>
            <Text style={styles.statLabel}>Botellas</Text>
          </View>
          <View style={styles.dividerVertical} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>21.4</Text>
            <Text style={styles.statLabel}>kg CO2</Text>
          </View>
          <View style={styles.dividerVertical} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3350</Text>
            <Text style={styles.statLabel}>Puntos</Text>
          </View>
        </View>

        {/* 3. MENÚ DE OPCIONES */}
        <View style={styles.menuContainer}>
          {menuOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.iconWrapper}>
                  <Ionicons
                    name={option.icon as any}
                    size={22}
                    color="#95D5B2"
                  />
                </View>
                <Text style={styles.menuItemText}>{option.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#3A5A46" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. BOTÓN CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color="#E66767" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        {/* Espacio para que el menú inferior flotante no tape el contenido */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A110D", // Fondo oscuro profundo con leve tinte verde
  },
  container: {
    padding: 20,
  },
  /* --- HEADER --- */
  profileHeader: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#95D5B2", // Borde elegante verde claro
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1B4332",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0A110D",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E8F0EA", // Blanco suave
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: "#95D5B2",
    fontWeight: "500",
  },
  /* --- ESTADÍSTICAS --- */
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#16221A", // Tarjeta oscura
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#2D4A36",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#8A9A90",
  },
  dividerVertical: {
    width: 1,
    backgroundColor: "#2D4A36",
    height: "80%",
    alignSelf: "center",
  },
  /* --- MENÚ --- */
  menuContainer: {
    backgroundColor: "#16221A",
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#2D4A36",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#213326",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#0D1A12",
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: "#E8F0EA",
    fontWeight: "500",
  },
  /* --- CERRAR SESIÓN --- */
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1515", // Fondo levemente rojizo oscuro
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#4A2525",
  },
  logoutText: {
    color: "#E66767",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
