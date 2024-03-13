import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Header() {
  const { navigate } = useRouter();
  const _ = usePathname();

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => navigate("/")}>
        <Text style={{ color: "white" }}>Back</Text>
      </Pressable>

      <Text style={styles.heading}>Pokewiki</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: "center",
    position: "relative",
  },
  heading: { textAlign: "center", fontSize: 20, fontWeight: "bold" },
  back: {
    position: "absolute",
    left: 0,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "black",
  },
});
