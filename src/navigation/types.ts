import { NewsItem } from "../entities/interfaces";

export type RootStackParamList = {
  MainPage: undefined;
  NewsPage: { newsItem: NewsItem };
};
