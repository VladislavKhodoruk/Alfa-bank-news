import { BASE_URL } from "../entities/constants";
import * as rssParser from "react-native-rss-parser";
import { NewsItem } from "../entities/interfaces";
import { NetworkResponse, NewsResponseBody } from "../entities/types";
import { ResponseKind } from "../entities/enums";
import { mapNews } from "./mappers";

export const fetchNews = async (): Promise<NetworkResponse<NewsItem[]>> => {
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,DELETE",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "724254c5d0mshfea2520c25fc950p1ad788jsn505c5f3425eb",
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  });

  if (response.ok) {
    const rowData: NewsResponseBody = await JSON.parse(await response.text());
    const news: NewsItem[] = mapNews(rowData);

    return { kind: ResponseKind.Success, body: news };
  }

  return {
    kind: ResponseKind.Failure,
  };
};
