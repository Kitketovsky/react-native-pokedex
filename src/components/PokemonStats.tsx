import { FlatList, StyleSheet } from "react-native";
import { PokemonStat } from "./PokemonStat";
import { IPokemon } from "../types/IPokemon";

export function PokemonStats({ data }: { data: IPokemon["stats"] }) {
  return (
    <FlatList
      data={data}
      style={styles.list}
      keyExtractor={(item) => item.stat.name}
      numColumns={3}
      contentContainerStyle={{ gap: 20 }}
      columnWrapperStyle={{ gap: 10 }}
      renderItem={({ item, index }) => <PokemonStat data={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 20 },
});
