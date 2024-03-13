import { FlatList, StyleSheet, View, Text } from "react-native";
import { Pokemon } from "../types";
import { PokemonAbility } from "./PokemonAbility";

export function PokemonAbilities({ data }: { data: Pokemon["abilities"] }) {
  return (
    <FlatList
      style={styles.list}
      data={data}
      renderItem={(data) => <PokemonAbility {...data} />}
      ListHeaderComponent={
        <View>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Abilities
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 20 },
});
