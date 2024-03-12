import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokemonType, Pokemons } from "../types";
import { PokemonCard } from "./PokemonCard";
import { useState } from "react";
import Picker from "react-native-picker-select";
import { POKEMON_TYPES } from "../const/pokemonTypes";
import { useQuery } from "@tanstack/react-query";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

export function PokemonTable() {
  const { data, isPending, isError } = useQuery<Pokemons>({
    queryKey: ["pokemons"],
    queryFn: () => fetch(POKEMON_API_URL).then((res) => res.json()),
    refetchOnMount: false,
  });

  const [selectedType, setSelectedType] = useState<PokemonType | "all" | null>(
    "all"
  );

  const selectTypes = [
    { label: "All", value: "all" },
    ...POKEMON_TYPES.map((type) => ({
      label: type[0].toUpperCase() + type.slice(1),
      value: type,
    })),
  ];

  if (isPending) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>Error</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centered}>
        <Text style={{ textAlign: "center" }}>
          Sorry, but there's no data from the server...
        </Text>
      </View>
    );
  }

  async function onEndReached() {
    // if (!data?.next) return null;
    // try {
    //   const response = await fetch(data.next);
    //   const nextPokemonsData: Pokemons = await response.json();
    //   const mergedResults = [...data.results, ...nextPokemonsData.results];
    //   setData({
    //     ...data,
    //     results: mergedResults,
    //     next: nextPokemonsData.next,
    //     previous: nextPokemonsData.previous,
    //   });
    // } catch (error) {
    //   console.log("Error fetching next page", error);
    // }
  }

  return (
    <View>
      <View>
        <Picker
          items={selectTypes}
          onValueChange={(value) => setSelectedType(value)}
          value={selectedType}
        />
      </View>

      <FlatList
        data={data.results}
        renderItem={({ item }) => (
          <PokemonCard {...item} selectedType={selectedType} />
        )}
        keyExtractor={({ name }) => name}
        contentContainerStyle={styles.gap}
        columnWrapperStyle={styles.gap}
        numColumns={2}
        onEndReached={onEndReached}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignContent: "center" },
  gap: { gap: 10 },
});
