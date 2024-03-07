import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { PokemonTable } from "./src/components/PokemonTable";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PokemonTable />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
