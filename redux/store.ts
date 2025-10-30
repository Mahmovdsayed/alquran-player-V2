import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage";
import reciterReducer from "./slices/reciterSlice";

const rootReducer = combineReducers({
  reciter: reciterReducer,
});

const persistConfig = {
  key: "global",
  storage,
  whitelist: ["reciter"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlewar: any) =>
    getDefaultMiddlewar({
      serializableCheck: false,
      immutableCheck: false,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
