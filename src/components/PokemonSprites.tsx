import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Pokemon } from "../types";
import { useEffect, useState } from "react";
import { PokemonStats } from "./PokemonStats";

function getSpritesLinks(data: Record<string, {} | string | null>) {
  const result: { key: string; url: string }[] = [];

  for (let [key, value] of Object.entries(data)) {
    if (!value) continue;

    if (typeof value === "string") {
      if (value.endsWith("svg")) {
        continue;
      }

      result.push({ key, url: value });
    } else {
      result.push(...getSpritesLinks(value));
    }
  }

  return result;
}

export function PokemonSprites({ data }: { data?: Pokemon["sprites"] }) {
  if (!data) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Image
        source={{ uri: data.other["official-artwork"].front_default }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: "center" },
});
