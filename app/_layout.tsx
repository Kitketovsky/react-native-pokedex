import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function MainLayout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  //  TODO: load fonts here

  return (
    <View style={[styles.container, insets]}>
      <Slot />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
