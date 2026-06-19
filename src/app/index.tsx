import ActionButton from "@/components/ActionButton";
import Banner from "@/components/Banner";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardPoints from "../components/CardPoints";
import GraphCard from "../components/GraphCard";
import HeaderDashboard from "../components/HeaderDashboard";
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Usamos ScrollView por si la pantalla de un celular es chica y necesita scrollear */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <HeaderDashboard />
        <CardPoints />
        <ActionButton />
        <Banner />
        <GraphCard />
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FFF2", // Fondo general verde muy clarito
  },
  container: {
    padding: 20,
  },
});
