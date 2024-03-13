import { PokemonStats } from "@/src/components/PokemonStats";
import { Pokemon } from "@/src/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PokemonPage() {
  const { pokemon } = useLocalSearchParams();

  const queryClient = useQueryClient();

  if (!pokemon) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  const pokemonData = queryClient.getQueryData<Pokemon>([
    "pokemon",
    ...pokemon,
  ]);

  return (
    <View style={{ flex: 1 }}>
      <PokemonStats data={pokemonData?.stats || []} />
    </View>
  );
}
