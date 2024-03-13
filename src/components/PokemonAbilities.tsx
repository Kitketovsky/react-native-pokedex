import { StyleSheet, View, Text } from "react-native";
import { Pokemon } from "../types";
import { PokemonAbility } from "./PokemonAbility";

export function PokemonAbilities({ data }: { data: Pokemon["abilities"] }) {
  return (
    <View style={styles.wrapper}>
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
        Abilities
      </Text>

      <View>
        {data.map((ability, index) => (
          <PokemonAbility key={index} item={ability} index={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingVertical: 20 },
});
