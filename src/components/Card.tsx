import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { VARS } from "../styles/vars/variables";
import { convertDate } from "../entities/helpers";
import { createRef, useEffect, useRef, useState } from "react";
import React from "react";

interface IProperties {
  title: string;
  description: string;
  date: string;
  fullScreenMode?: boolean | undefined;
  isFavourite: boolean;
  style?: StyleProp<ViewStyle> | undefined;
}

export default function Card(props: IProperties) {
  return (
    <View style={[styles.container, props.style]}>
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
            {props.title}
          </Text>
        </View>
        <View style={[styles.descriptionContainer]}>
          <Text
            numberOfLines={props.fullScreenMode ? undefined : 5}
            ellipsizeMode="tail"
            style={[styles.description, VARS.FONTS.defaultFont]}
          >
            {props.description}
          </Text>
        </View>
        <View style={styles.dateLabel}>
          <Text style={VARS.FONTS.lightFont}>{convertDate(props.date)}</Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={
                props.isFavourite
                  ? require("../../assets/star-filled.png")
                  : require("../../assets/star.png")
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: VARS.OFFSETS.quarter,
    flex: 1,
  },
  cardContainer: {
    borderRadius: VARS.BORDERS.borderRadiusDefault,
    paddingVertical: VARS.OFFSETS.default,
    paddingHorizontal: VARS.OFFSETS.double,
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
    overflow: "hidden",
  },
  description: {
    textAlign: "left",
    justifyContent: "flex-end",
  },
  dateLabel: {
    alignItems: "flex-end",
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
