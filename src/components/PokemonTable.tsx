import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Pokemons } from "../types";
import { PokemonCard } from "./PokemonCard";
import { useQuery } from "../hooks/useQuery";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

export function PokemonTable() {
  const { data, loading, error, setData } = useQuery<Pokemons>({
    url: POKEMON_API_URL,
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} />
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
    if (!data?.next) return null;

    try {
      const response = await fetch(data.next);
      const nextPokemonsData: Pokemons = await response.json();

      const mergedResults = [...data.results, ...nextPokemonsData.results];

      setData({
        ...data,
        results: mergedResults,
        next: nextPokemonsData.next,
        previous: nextPokemonsData.previous,
      });
    } catch (error) {
      console.log("Error fetching next page", error);
    }
  }

  return (
    <FlatList
      data={data.results}
      renderItem={({ item }) => <PokemonCard {...item} />}
      keyExtractor={({ name }) => name}
      contentContainerStyle={styles.gap}
      columnWrapperStyle={styles.gap}
      numColumns={2}
      onEndReached={onEndReached}
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignContent: "center" },
  gap: { gap: 10 },
});
