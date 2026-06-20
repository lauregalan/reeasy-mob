import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

// Componente personalizado para que el botón de la cámara flote
const CustomCameraButton = ({ children, onPress }: CustomCameraButtonProps) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.customButton}>{children}</View>
  </TouchableOpacity>
);

interface CustomCameraButtonProps {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Ocultamos el header superior genérico
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2E7D32", // Verde oscuro para el ícono activo
        tabBarInactiveTintColor: "#555555", // Gris para los inactivos
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="canjear"
        options={{
          title: "Canjear",
          tabBarIcon: ({ color }) => (
            <Ionicons name="gift-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="escanear"
        options={{
          title: "", // Sin texto para que el círculo quede limpio
          tabBarIcon: ({ focused }) => (
            <Ionicons name="camera-outline" size={32} color="#000" />
          ),
          tabBarButton: (props) => <CustomCameraButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="recolectar"
        options={{
          title: "Recolectar",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bus-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={26} color={color} />
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
    position: "absolute",
    bottom: 0,
    height: 70,
    backgroundColor: "#DCEBCE", // El fondo verde claro de tu diseño
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 0,
    borderTopWidth: 0,
  },
  customButtonContainer: {
    top: -20, // Acá está la magia para que suba y "flote"
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35, // Círculo perfecto
    backgroundColor: "#FFFFFF",
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center",
  },
});
