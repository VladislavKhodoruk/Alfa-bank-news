import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import Card from "../components/Card";
import { VARS } from "../styles/vars/variables";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { LabelText, LoadingStatus, PageNames } from "../entities/enums";
import { changeFavourite, fetchNews } from "../redux/NewsSlice";
import { useAppNavigation } from "../navigation/helpers";
import { NewsItem } from "../entities/interfaces";
import { getFromCache } from "../entities/helpers";
export default function MainPage() {
  const [onMain, setOnMain] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const $newsState = useSelector((state: RootState) => state.newsList);
  const navigation = useAppNavigation();

  async function setFavouriteNewsInState() {
    const favouriteNewsFromCache = await getFromCache<NewsItem[]>(
      "favouriteNews"
    );

    for (let item of favouriteNewsFromCache) {
      dispatch(changeFavourite({ news: item }));
    }
  }

  useEffect(() => {
    dispatch(fetchNews());
    setFavouriteNewsInState();
  }, []);

  function onPanelPress(onMain: boolean) {
    setOnMain(onMain);
  }

  function onRefreshPress() {
    dispatch(fetchNews());
  }

  return (
    <View style={styles.container}>
      <View style={styles.navigationPanel}>
        <TouchableHighlight
          underlayColor="white"
          onPress={() => onPanelPress(true)}
          style={[styles.navigationButton, onMain ? styles.buttonActive : null]}
        >
          <Text style={[VARS.FONTS.navFont, onMain ? styles.textActive : null]}>
            {LabelText.AllNews}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="white"
          onPress={() => onPanelPress(false)}
          style={[
            styles.navigationButton,
            !onMain ? styles.buttonActive : null,
          ]}
        >
          <Text
            style={[VARS.FONTS.navFont, !onMain ? styles.textActive : null]}
          >
            {LabelText.FavouriteNews}
          </Text>
        </TouchableHighlight>
      </View>

      {$newsState.loadingStatus === LoadingStatus.Loading && (
        <ActivityIndicator
          size="large"
          style={styles.loaderContainer}
          color={VARS.COLORS.red}
        />
      )}

      {$newsState.loadingStatus === LoadingStatus.Error &&
        (onMain ? (
          <View style={styles.warningContainer}>
            <Text style={[VARS.FONTS.defaultFont, styles.warningText]}>
              {LabelText.Error}
            </Text>

            <TouchableOpacity onPress={onRefreshPress}>
              <View style={styles.errorButtonContainer}>
                <Text style={[VARS.FONTS.defaultFont, styles.errorButtonText]}>
                  {LabelText.Refresh}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={
              <View style={styles.warningContainer}>
                <Text style={[VARS.FONTS.defaultFont, styles.warningText]}>
                  {LabelText.EmptyView}
                </Text>
              </View>
            }
            style={styles.listContainer}
            keyExtractor={(item) => item.id}
            data={$newsState.favouriteNews}
            ItemSeparatorComponent={() => (
              <View style={{ height: VARS.OFFSETS.default }} />
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate(PageNames.NewsPage, {
                    newsItem: item,
                  })
                }
              >
                <Card newsItem={item} />
              </TouchableOpacity>
            )}
          />
        ))}

      {$newsState.loadingStatus === LoadingStatus.Loaded && (
        <FlatList
          ListEmptyComponent={
            <View style={styles.warningContainer}>
              <Text style={[VARS.FONTS.defaultFont, styles.warningText]}>
                {LabelText.EmptyView}
              </Text>
            </View>
          }
          style={styles.listContainer}
          keyExtractor={(item) => item.id}
          data={onMain ? $newsState.news : $newsState.favouriteNews}
          ItemSeparatorComponent={() => (
            <View style={{ height: VARS.OFFSETS.default }} />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate(PageNames.NewsPage, {
                  newsItem: item,
                })
              }
            >
              <Card newsItem={item} />
            </TouchableOpacity>
          )}
        />
      )}
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: VARS.COLORS.grayLight,
    paddingBottom: VARS.OFFSETS.default,
    flex: 1,
  },
  navigationPanel: {
    flexDirection: "row",
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
    paddingTop: VARS.OFFSETS.default,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  warningContainer: {
    height: "100%",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  warningText: {
    fontSize: 18,
  },
  errorButtonContainer: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: VARS.COLORS.bluePrimary,
    elevation: 3,
  },
  errorButtonText: {
    fontSize: 16,
    color: VARS.COLORS.blueLight,
  },
});
