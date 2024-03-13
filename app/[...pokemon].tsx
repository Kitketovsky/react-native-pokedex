import { PokemonAbilities } from "@/src/components/PokemonAbilities";
import { PokemonSprites } from "@/src/components/PokemonSprites";
import { PokemonStats } from "@/src/components/PokemonStats";
import { IPokemon } from "@/src/types/IPokemon";
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

  const pokemonData = queryClient.getQueryData<IPokemon>([
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
