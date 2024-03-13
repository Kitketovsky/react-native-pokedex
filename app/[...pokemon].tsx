import { PokemonAbilities } from "@/src/components/PokemonAbilities";
import { PokemonSprites } from "@/src/components/PokemonSprites";
import { PokemonStats } from "@/src/components/PokemonStats";
import { Pokemon } from "@/src/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

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
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <PokemonSprites data={pokemonData?.sprites} />
        <PokemonStats data={pokemonData?.stats || []} />
      </View>
      <PokemonAbilities data={pokemonData?.abilities || []} />
    </View>
  );
}
