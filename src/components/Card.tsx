import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VARS } from "../styles/vars/variables";
import { convertDate, setCache } from "../entities/helpers";
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/state";
import { changeFavourite } from "../redux/NewsSlice";
import { NewsItem } from "../entities/interfaces";

interface IProperties {
  newsItem: NewsItem;
  fullScreenMode?: boolean | undefined;
}

export default function Card(props: IProperties) {
  const dispatch = useDispatch<AppDispatch>();
  const $newsState = useSelector((state: RootState) => state.newsList);

  async function onLabelPress() {
    dispatch(changeFavourite({ news: props.newsItem }));
  }

  useEffect(() => {
    setCache(
      "favouriteNews",
      $newsState.favouriteNews ? $newsState.favouriteNews : []
    );
  }, [$newsState.favouriteNews]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View
          style={[
            styles.titleContainer,
            props.fullScreenMode ? styles.withBorder : null,
          ]}
        >
          <Text
            numberOfLines={props.fullScreenMode ? 5 : 3}
            ellipsizeMode="tail"
            style={VARS.FONTS.primaryFont}
          >
            {props.newsItem.title}
          </Text>
        </View>
        {props.fullScreenMode ? (
          <View
            style={[
              styles.descriptionContainerFullscreen,
              styles.descriptionContainer,
            ]}
          >
            <ScrollView>
              <Text>{props.newsItem.description}</Text>
            </ScrollView>
          </View>
        ) : (
          <View style={[styles.descriptionContainer]}>
            <Text numberOfLines={5}>{props.newsItem.description}</Text>
          </View>
        )}

        <View style={styles.dateLabelContainer}>
          <Text style={[VARS.FONTS.lightFont, styles.dateLabel]}>
            {convertDate(props.newsItem.date)}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={onLabelPress}>
            {$newsState.favouriteNews.find(
              (item) => item.id === props.newsItem.id
            ) ? (
              <Image
                style={styles.image}
                source={require("../../assets/star-filled.png")}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("../../assets/star.png")}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: VARS.OFFSETS.half,
    paddingVertical: VARS.OFFSETS.half,
  },
  cardContainer: {
    flex: 1,
    borderRadius: VARS.BORDERS.borderRadiusDefault,
    paddingVertical: VARS.OFFSETS.default,
    paddingHorizontal: VARS.OFFSETS.default,
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "column",
    position: "relative",
    shadowColor: "black",
    elevation: 3,
  },
  titleContainer: {
    marginBottom: VARS.OFFSETS.default,
  },
  withBorder: {
    paddingBottom: VARS.OFFSETS.default,
    borderBottomColor: VARS.COLORS.blueLight,
    borderBottomWidth: 1,
  },
  descriptionContainer: {
    marginBottom: VARS.OFFSETS.default,
    height: 83,
  },
  descriptionContainerFullscreen: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  dateLabelContainer: {
    alignItems: "flex-end",
  },
  dateLabel: {
    textTransform: "capitalize",
  },
  imageContainer: {
    position: "absolute",
    top: 17,
    right: -5,
    backgroundColor: "white",
    width: 45,
    paddingVertical: VARS.OFFSETS.quarter,
    paddingHorizontal: VARS.OFFSETS.half,
    borderBottomLeftRadius: VARS.BORDERS.borderRadiusSmall,
    borderTopLeftRadius: VARS.BORDERS.borderRadiusSmall,
    shadowColor: "black",
    elevation: 3,
  },
  image: {
    height: 25,
    width: 25,
  },
});
