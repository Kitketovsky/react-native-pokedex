import { Header } from "@/src/components/Header";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const client = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export default function MainLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  //  TODO: load fonts here

  return (
    <SafeAreaView style={[styles.container]}>
      <QueryClientProvider client={client}>
        <Header />
        <Slot />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
});
