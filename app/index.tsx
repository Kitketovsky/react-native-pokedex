import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Picker from "react-native-picker-select";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonCard } from "@/src/components/PokemonCard";
import { TYPE_COLORS } from "@/src/const/pokemonTypeColors";
import { POKEMON_TYPES } from "@/src/const/pokemonTypes";
import { IPokemonType } from "@/src/types/IPokemonType";
import { IPokemons } from "@/src/types/IPokemons";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40";

export default function PokemonTable() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    error,
    isFetching,
  } = useInfiniteQuery<IPokemons>({
    queryKey: ["pokemons"],
    queryFn: async ({ pageParam }) => {
      console.log("pageParam", pageParam);
      // @ts-ignore
      const response = await fetch(pageParam);
      const allPokemons = (await response.json()) as IPokemons;

      const promises = allPokemons.results.map(async ({ url }) => {
        const response = await fetch(url);
        const pokemonData = await response.json();
        return pokemonData;
      });

      const pokemonsData = await Promise.all(promises);

      const resultsWithPokemonData = allPokemons.results.map(
        ({ name, url }, index) => ({ name, url, data: pokemonsData[index] })
      );

      return { ...allPokemons, results: resultsWithPokemonData };
    },
    refetchOnMount: false,
    initialPageParam: POKEMON_API_URL,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const [selectedType, setSelectedType] = useState<IPokemonType | null>(null);

  const selectTypes = POKEMON_TYPES.map((type) => ({
    label: type[0].toUpperCase() + type.slice(1),
    value: type,
  }));

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
        <Text>Error: {error.message}</Text>
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

  const flatListData = data.pages.map(({ results }) => results).flat();

  const filteredListData = flatListData.filter(({ data }) => {
    const pokemonTypes = data.types.map(({ type }) => type.name);

    const isInSelectedType =
      !selectedType || pokemonTypes.includes(selectedType);

    return isInSelectedType;
  });

  return (
    <FlatList
      data={filteredListData}
      renderItem={({ item }) => <PokemonCard {...item} />}
      keyExtractor={({ name }) => name}
      contentContainerStyle={[styles.gap]}
      columnWrapperStyle={styles.gap}
      numColumns={2}
      onEndReached={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
      ListHeaderComponent={
        <View style={styles.filterContainer}>
          <Text>Type:</Text>

          <Picker
            items={selectTypes}
            onValueChange={(value) => setSelectedType(value)}
            value={selectedType}
            style={{
              inputIOSContainer: {
                backgroundColor: !selectedType
                  ? "#eee"
                  : TYPE_COLORS[selectedType],
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 12,
              },
            }}
          />
        </View>
      }
      ListFooterComponent={
        <View style={{ alignItems: "center" }}>
          {isFetching && <ActivityIndicator size={"large"} />}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignContent: "center" },
  gap: { gap: 10 },
  filterContainer: { gap: 6, paddingVertical: 12 },
});
