import { NewsItem } from "../entities/interfaces";
import { NewsItemFromApi, NewsResponseBody } from "../entities/types";

export function mapNews(apiNews: NewsResponseBody): NewsItem[] {
  const news: NewsItem[] = apiNews.results.map((item: NewsItemFromApi) => {
    return {
      id: item.link,
      title: item.title,
      description: item.content,
      date: item.pubDate,
    };
  });

  return news;
}
