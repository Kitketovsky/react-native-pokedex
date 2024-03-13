import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokemonCard } from "./PokemonCard";
import React, { useState } from "react";
import Picker from "react-native-picker-select";
import { POKEMON_TYPES } from "../const/pokemonTypes";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { TYPE_COLORS } from "../const/pokemonTypeColors";
import { IPokemons } from "../types/IPokemons";
import { IPokemonType } from "../types/IPokemonType";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

export function PokemonTable() {
  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<IPokemons>({
      queryKey: ["pokemons"],
      // @ts-ignore
      queryFn: ({ pageParam }) => fetch(pageParam).then((res) => res.json()),
      refetchOnMount: false,
      initialPageParam: POKEMON_API_URL,
      getNextPageParam: (lastPage, pages) => lastPage.next,
    });

  const queryClient = useQueryClient();

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

  const flatListData = data.pages.map(({ results }) => results).flat();

  return (
    <View>
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

      <FlatList
        data={flatListData}
        renderItem={({ item }) => (
          <PokemonCard {...item} selectedType={selectedType} />
        )}
        keyExtractor={({ name }) => name}
        contentContainerStyle={styles.gap}
        columnWrapperStyle={styles.gap}
        numColumns={2}
        onEndReached={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignContent: "center" },
  gap: { gap: 10 },
  filterContainer: { gap: 6, paddingVertical: 12 },
});
