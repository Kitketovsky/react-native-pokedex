import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Header() {
  const { canGoBack, back, navigate } = useRouter();
  const _ = usePathname();

  return (
    <View style={styles.container}>
      {canGoBack() && (
        <Pressable
          style={{
            position: "absolute",
            left: 0,
            padding: 10,
            backgroundColor: "black",
            borderRadius: 10,
          }}
          onPress={back}
        >
          <Text style={{ color: "white", pointerEvents: "none" }}>Back</Text>
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
});
