import { View, Text, Image, StyleSheet } from "react-native";
import { Stat } from "../types";

const STATS_ICONS = {
  hp: require("./../../assets/icons/heart.png"),
  attack: require("./../../assets/icons/attack.png"),
  defense: require("./../../assets/icons/defense.png"),
  "special-attack": require("./../../assets/icons/attack.png"),
  "special-defense": require("./../../assets/icons/defense.png"),
  speed: require("./../../assets/icons/speed.png"),
};

export function PokemonStat({ data }: { data: Stat }) {
  return (
    <View style={styles.wrapper}>
      <Text>{data.base_stat}</Text>

      <View style={styles.statWrapper}>
        {data.stat.name.startsWith("special") && <Text>S</Text>}
        <Image source={STATS_ICONS[data.stat.name]} style={styles.statImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: "center", flex: 1, gap: 2 },
  statWrapper: { flexDirection: "row", alignItems: "center" },
  statImage: { width: 30, height: 30 },
});
