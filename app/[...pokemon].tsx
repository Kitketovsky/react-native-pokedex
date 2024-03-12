import { Pokemon } from "@/src/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function PokemonPage() {
  const { pokemon } = useLocalSearchParams();
  const { canGoBack, back, navigate } = useRouter();

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
    <ScrollView style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          if (canGoBack()) {
            back();
          } else {
            navigate("/");
          }
        }}
      >
        <Text>Back</Text>
      </Pressable>
      <Text numberOfLines={20}>{JSON.stringify(pokemonData)}</Text>
    </ScrollView>
  );
}
