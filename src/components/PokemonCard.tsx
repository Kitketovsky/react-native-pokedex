import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useQuery } from "../hooks/useQuery";
import { PolemonTypes } from "./PokemonTypes";
import { Pokemon } from "../types";
import { Link } from "expo-router";

interface Props {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: Props) {
  const { loading, data, error } = useQuery<Pokemon>({ url });

  if (loading || !data) {
    return (
      <View style={{ flex: 1, minHeight: 200 }}>
        <Text>{name}</Text>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      </View>
    );
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
