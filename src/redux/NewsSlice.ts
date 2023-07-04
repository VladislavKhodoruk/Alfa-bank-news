import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoadingStatus, ResponseKind } from "../entities/enums";
import { sortNewsByDate } from "../entities/helpers";
import { NewsItem } from "../entities/interfaces";
import * as apiClient from "../services/newsApiClient";

export interface NewsListState {
  news: NewsItem[];
  favouriteNews: NewsItem[];
  loadingStatus: LoadingStatus;
}

const initialState: NewsListState = {
  news: [],
  favouriteNews: [],
  loadingStatus: LoadingStatus.Default,
};

export const fetchNews = createAsyncThunk<{ news: NewsItem[] }>(
  "fetchUsers",
  async () => {
    const response = await apiClient.fetchNews();

    if (response.kind === ResponseKind.Success) {
      return {
        news: response.body ?? [],
      };
    } else {
      throw "Error fetching news";
    }
  }
);

const newsListSlice = createSlice({
  name: "newsList",
  initialState,
  reducers: {
    changeFavourite(state, action) {
      const newsItem: NewsItem = action.payload.news;

      if (state.favouriteNews.find((item) => item.id === newsItem.id)) {
        state.favouriteNews = state.favouriteNews.filter(
          (item) => item.id != newsItem.id
        );
      } else {
        state.favouriteNews.push(newsItem);
      }

      state.favouriteNews = sortNewsByDate(state.favouriteNews);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload.news;
        state.loadingStatus = LoadingStatus.Loaded;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Error;
      });
  },
});

export const { changeFavourite } = newsListSlice.actions;

export default newsListSlice.reducer;
