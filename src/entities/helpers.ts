import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATE_OPTIONS } from "./constants";
import { NewsItem } from "./interfaces";

export function convertDate(date: string): string {
  return new Date(date).toLocaleString("ru", DATE_OPTIONS);
}

export async function setCache(key: string, data: any): Promise<void> {
  await AsyncStorage.removeItem(key);
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function getFromCache<T>(key: string): Promise<T> {
  return JSON.parse((await AsyncStorage.getItem(key))!);
}

export function sortNewsByDate(news: NewsItem[]): NewsItem[] {
  return [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
