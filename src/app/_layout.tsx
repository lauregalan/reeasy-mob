import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Componente personalizado para el botón circular flotante de la cámara
const CustomCameraButton = (props: any) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={props.onPress}
    activeOpacity={0.8}
    accessibilityRole="button"
    accessibilityState={props.accessibilityState}
  >
    <View style={styles.customButton}>
      <Ionicons name="camera-outline" size={28} color="#000" />
    </View>
  </TouchableOpacity>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2E7D32", // Verde oscuro para el ícono activo
        tabBarInactiveTintColor: "#555555", // Gris para los inactivos
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="canjear"
        options={{
          title: "Canjear",
          tabBarIcon: ({ color }) => (
            <Ionicons name="gift-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="escanear"
        options={{
          title: "",
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => <CustomCameraButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="recolectar"
        options={{
          title: "Recolectar",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bus-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="carrito" options={{ href: null }} />
      <Tabs.Screen name="invitar" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#DCEBCE",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    height: 72,
    paddingTop: 6,
    paddingBottom: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarItem: {
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
    marginBottom: 2,
  },
  customButtonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

