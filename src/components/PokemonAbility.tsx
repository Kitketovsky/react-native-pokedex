import { StyleSheet, Text, View } from "react-native";
import type { Pokemon, PokemonAbility } from "../types";
import { useQuery } from "@tanstack/react-query";

export function PokemonAbility({
  item,
  index,
}: {
  item: Pokemon["abilities"][number];
  index: number;
}) {
  const { data, isPending, isError } = useQuery<PokemonAbility>({
    queryKey: ["ability", item.ability.name],
    queryFn: () => fetch(item.ability.url).then((res) => res.json()),
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error...</Text>;
  }

  return (
    <View style={{ paddingVertical: 12, gap: 8 }}>
      <Text style={styles.abilityHeading}>
        {data.names.find((names) => names.language.name === "en")!.name}
      </Text>

      <Text>
        {
          data.effect_entries.find((effect) => effect.language.name === "en")!
            .effect
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  abilityHeading: { fontWeight: "bold" },
});
