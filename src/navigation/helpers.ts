import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};
