import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import { NotificationClickEvent, OneSignal } from "react-native-onesignal";
import { tagUserInfoCreate } from "./src/notification/notificationsTags";
import { useEffect } from "react";

OneSignal.initialize("57e42e81-5b5f-434f-93a5-5f922e5df190");
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const handleNotificationCLick = (event: NotificationClickEvent): void => {
      console.log("Notificação aberta!");

      const { actionId } = event.result;

      switch (actionId) {
        case "1":
          console.log("Ver todos");
          break;
        case "2":
          console.log("Ver pedido");
          break;
        default:
          console.log("Nenhum botão de ação selecionado.");
          break;
      }
    };

    OneSignal.Notifications.addEventListener("click", handleNotificationCLick);

    return () =>
      OneSignal.Notifications.removeEventListener(
        "click",
        handleNotificationCLick
      );
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
