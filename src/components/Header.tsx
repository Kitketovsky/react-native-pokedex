import { StyleSheet, Text, View } from "react-native";

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pokewiki</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
  heading: { textAlign: "center", fontSize: 20, fontWeight: "bold" },
});
