import { StyleSheet, Text, View } from "react-native";

export default function InvitarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Invitar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F9EE",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2E7D32",
  },
});
