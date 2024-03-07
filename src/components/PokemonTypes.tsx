import { StyleSheet, View, Text } from "react-native";
import { Pokemon } from "../types";
import { TYPE_COLORS } from "../const/pokemonTypeColors";

export function PolemonTypes({ types }: { types: Pokemon["types"] }) {
  return (
    <View style={styles.wrapper}>
      {[...new Set(types)].map(({ type }) => (
        <Text
          key={type.name}
          style={[
            styles.type,
            { backgroundColor: TYPE_COLORS[type.name] || "transparent" },
          ]}
        >
          {type.name}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  type: {
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 4,
    overflow: "hidden",
  },
});
