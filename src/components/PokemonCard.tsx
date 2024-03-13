import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { PolemonTypes } from "./PokemonTypes";
import { Pokemon, PokemonType } from "../types";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";

interface Props {
  name: string;
  url: string;
  selectedType: PokemonType | null;
}

export function PokemonCard({ name, url, selectedType }: Props) {
  const { isPending, data, isError } = useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Networl error");
      }

      return await response.json();
    },
  });

  if (isPending) {
    return (
      <View style={{ flex: 1, minHeight: 200 }}>
        <Text>{name}</Text>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Error</Text>
      </View>
    );
  }

  const pokemonTypes = data.types.map(({ slot, type }) => type.name);

  const show = !selectedType || pokemonTypes.includes(selectedType);

  // TODO: items that are not rendered also take place in FlatList
  if (!show) {
    return null;
  }

  return (
    <Link
      href={{ pathname: "/[pokemon]", params: { pokemon: name } }}
      style={{ flex: 1 }}
      asChild
    >
      <Pressable style={styles.wrapper}>
        <View style={[styles.info]}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.id}>#{data.id}</Text>
        </View>

        <Image
          source={{
            uri: data.sprites.other["official-artwork"].front_default,
          }}
          style={[styles.image]}
          width={200}
          height={200}
        />

        <PolemonTypes types={data.types} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "beige",
    gap: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  info: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 22, textTransform: "capitalize" },
  id: { fontWeight: "bold" },
  image: { width: "100%", objectFit: "cover", height: 200 },
});
