import { ResponseKind } from "./enums";

export type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

export type NewsResponseBody = {
  results: NewsItemFromApi[];
};

export type NewsItemFromApi = {
  title: string;
  link: string;
  content: string;
  pubDate: string;
};
