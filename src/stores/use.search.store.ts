import React from "react";
import { create } from "zustand";

export interface SearchData {
  city: | "서울"
  | "부산"
  | "경주"
  | "제주도"
  | "가평"
  | "강릉"
  | "여수"
  | "전주"
  | "해남"
  | "대구"
  | null;
  startDay: Date | undefined;
  endDay: Date | undefined;
  personCount: number;
}


interface SearchState {
  searchData: SearchData;
  pushData: (searchData: SearchData) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchData: { city:null, startDay: undefined, endDay: undefined, personCount: 1 },
  pushData: (searchData: SearchData) => set({ searchData })
}));

export default useSearchStore;
