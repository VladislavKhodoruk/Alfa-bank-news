import { StyleSheet, View } from "react-native";
import Card from "../components/Card";
import { VARS } from "../styles/vars/variables";

export default function NewsPage({ route }: { route: any }) {
  const { newsItem } = route.params;

  return (
    <View style={styles.container}>
      <Card newsItem={newsItem} fullScreenMode={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: VARS.COLORS.grayLight,
    paddingVertical: VARS.OFFSETS.default,
    paddingHorizontal: VARS.OFFSETS.default,
    flex: 1,
  },
  cardContainer: {},
});
