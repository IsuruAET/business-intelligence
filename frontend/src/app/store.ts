import { configureStore } from "@reduxjs/toolkit";
import { ragApi } from "../features/rag/ragApi";

export const store = configureStore({
  reducer: {
    [ragApi.reducerPath]: ragApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ragApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
