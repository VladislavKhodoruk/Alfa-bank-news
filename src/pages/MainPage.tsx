import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import Card from "../components/Card";
import { VARS } from "../styles/vars/variables";
import { useState } from "react";

const apiItems = [
  {
    title: "Альфа-Банк автоматизировал работу МФО c участниками закупок",
    description:
      "Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....",
    id: 1,
    date: "Tue, 13 Jul 2021",
  },
  {
    title: "Альфа-Банк автоматизировал",
    description:
      "Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....",
    id: 2,
    date: "Tue, 13 Jul 2021",
  },
  {
    title: "Альфа-Банк автоматизировал работу МФО c участниками закупок",
    description:
      "Микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России авто",
    id: 3,
    date: "Tue, 13 Jul 2021",
  },
  {
    title: "Альфа-Банк автоматизировал работу МФО c участниками закупок",
    description:
      "Микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России авто",
    id: 4,
    date: "Tue, 13 Jul 2021",
  },
];

const favItems = [
  {
    title: "Альфа-Банк автоматизировал работу МФО c участниками закупок",
    description:
      "Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....",
    id: 1,
    date: "Tue, 13 Jul 2021",
  },
  {
    title: "Альфа-Банк автоматизировал",
    description:
      "Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....Альфа-Банк первым в России автоматизировал работу микрофинансовых организаций (МФО) c участниками закупок....",
    id: 2,
    date: "Tue, 13 Jul 2021",
  },
];

export default function MainPage({ navigation }: { navigation: any }) {
  const [onMain, setOnMain] = useState<boolean>(true);
  const [currentItems, setCurrentItems] = useState(apiItems);
  const [favouriteItems, setFavouriteItems] = useState<any>(favItems);

  function onMainPressed() {
    setOnMain(true);
  }

  function onFavouritePressed() {
    setOnMain(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigationPanel}>
        <TouchableHighlight
          underlayColor="white"
          onPress={onMainPressed}
          style={[styles.navigationButton, onMain ? styles.buttonActive : null]}
        >
          <Text style={[VARS.FONTS.navFont, onMain ? styles.textActive : null]}>
            Главная
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="white"
          onPress={onFavouritePressed}
          style={[
            styles.navigationButton,
            !onMain ? styles.buttonActive : null,
          ]}
        >
          <Text
            style={[VARS.FONTS.navFont, !onMain ? styles.textActive : null]}
          >
            Избранное
          </Text>
        </TouchableHighlight>
      </View>
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        data={currentItems}
        ItemSeparatorComponent={() => (
          <View style={{ height: VARS.OFFSETS.default }} />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("NewsPage")}
          >
            <Card
              title={item.title}
              description={item.description}
              date={item.date}
              isFavourite={favouriteItems.find(
                (curItem: any) => curItem.id === item.id
              )}
            />
          </TouchableOpacity>
        )}
      />
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: VARS.COLORS.grayLight,
    flex: 1,
  },
  navigationPanel: {
    flexDirection: "row",
    position: "absolute",
    paddingBottom: VARS.OFFSETS.quarter,
    zIndex: 1,
  },
  navigationButton: {
    flex: 1,
    padding: VARS.OFFSETS.quarter,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: VARS.COLORS.grayNavigation,
    shadowColor: "black",
    elevation: 5,
  },
  buttonActive: {
    backgroundColor: "white",
    zIndex: 1,
  },
  textActive: {
    color: VARS.COLORS.grayDark,
  },
  listContainer: {
    paddingHorizontal: VARS.OFFSETS.default,
    paddingTop: 40,
  },
});
