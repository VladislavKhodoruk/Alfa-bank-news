import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "./src/pages/MainPage";
import NewsPage from "./src/pages/NewsPage";
import { NavigationContainer } from "@react-navigation/native";
import { VARS } from "./src/styles/vars/variables";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackImageSource: require("./assets/arrow.png"),
          headerTintColor: VARS.COLORS.red,
        }}
      >
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{
            title: "Новости Альфа-Банка",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleStyle: {
              fontFamily: "roboto-medium",
              fontSize: 16,
              color: VARS.COLORS.red,
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="NewsPage"
          component={NewsPage}
          options={{
            title: "Новости Альфа-Банка",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleStyle: {
              fontFamily: "roboto-medium",
              fontSize: 16,
              color: VARS.COLORS.red,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
