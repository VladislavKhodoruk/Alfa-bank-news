import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "../pages/MainPage";
import NewsPage from "../pages/NewsPage";
import { NavigationContainer } from "@react-navigation/native";
import { VARS } from "../styles/vars/variables";
import { Image, StyleSheet } from "react-native";
import { RootStackParamList } from "./types";
import { LabelText, PageNames } from "../entities/enums";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackImageSource: require("../../assets/arrow.png"),
          headerTintColor: VARS.COLORS.red,
        }}
      >
        <Stack.Screen
          name={PageNames.MainPage}
          component={MainPage}
          options={{
            title: LabelText.Title,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "white",
            },
            headerLeft: () => (
              <Image
                source={require("../../assets/logo.png")}
                style={styles.image}
              />
            ),
            headerTitleStyle: {
              fontFamily: "roboto-medium",
              fontSize: 16,
              color: VARS.COLORS.red,
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name={PageNames.NewsPage}
          component={NewsPage}
          options={{
            title: LabelText.Title,
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

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 20,
  },
});
