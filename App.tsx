import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Navigation } from "./Navigation";

async function loadAppAplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (isReady) {
    return <Navigation />;
  }

  return (
    <AppLoading
      startAsync={loadAppAplication}
      onError={(err) => console.log(err)}
      onFinish={() => setIsReady(true)}
    />
  );
}
