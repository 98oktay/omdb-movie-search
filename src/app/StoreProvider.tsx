"use client";
import { store } from "@/store/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
