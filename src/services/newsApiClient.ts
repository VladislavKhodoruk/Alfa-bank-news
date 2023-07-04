import { BASE_URL } from "../entities/constants";
import * as rssParser from "react-native-rss-parser";
import { NewsItem } from "../entities/interfaces";
import { NetworkResponse } from "../entities/types";
import { ResponseKind } from "../entities/enums";

export const fetchNews = async (): Promise<NetworkResponse<NewsItem[]>> => {
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,DELETE",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Content-Type": "application/json; windows-1251",
    },
  });

  if (response.ok) {
    const rowData = await response.text();
    const parsedData = await rssParser.parse(rowData);

    const news: NewsItem[] = [];

    parsedData.items.forEach((item) =>
      news.push({
        id: item.id,
        title: "dwdw",
        description: item.description,
        date: item.published,
      })
    );

    return { kind: ResponseKind.Success, body: news };
  }

  return {
    kind: ResponseKind.Failure,
  };
};
