import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function PokemonPage() {
  const { pokemon } = useLocalSearchParams();
  const { canGoBack, back, navigate } = useRouter();

  return (
    <View>
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
      <Text>{pokemon}</Text>
    </View>
  );
}
