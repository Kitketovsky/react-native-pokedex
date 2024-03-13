import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Header() {
  const { navigate } = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {pathname !== "/" && (
        <Pressable style={styles.button} onPress={() => navigate("/")}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      )}

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
  button: {
    position: "absolute",
    left: 0,
    borderRadius: 15,
    backgroundColor: "black",
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
