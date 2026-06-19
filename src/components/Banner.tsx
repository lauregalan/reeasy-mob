import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Banner() {
  return (
    <View style={styles.infoBanner}>
      <Ionicons name="bulb" size={24} color="#FFD700" />
      <Text style={styles.infoBannerText}>
        Este mes llevas un total de 56 botellas recicladas
      </Text>
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
  /* --- INFO BANNER --- */
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  infoBannerText: {
    marginLeft: 10,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
});
