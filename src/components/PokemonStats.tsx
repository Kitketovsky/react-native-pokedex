import { FlatList, View, Text, Image } from "react-native";
import { Pokemon } from "../types";
import { PokemonStat } from "./PokemonStat";

export function PokemonStats({ data }: { data: Pokemon["stats"] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.stat.name}
      numColumns={3}
      contentContainerStyle={{ gap: 20 }}
      columnWrapperStyle={{ gap: 10 }}
      renderItem={({ item, index }) => <PokemonStat data={item} />}
    />
  );
}
