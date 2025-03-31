import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardsTabsEnum, KYCTabsEnum, VendorTabsEnum, AMLTabsEnum, KYCDocsTabsEnum, IndividualKYCTabsEnum, TreasuryTabsEnum } from "../../types";

export interface TabsState {
  currentKYCTab: KYCTabsEnum;
  currentVendorTab: VendorTabsEnum
  currentCardsTab: CardsTabsEnum;
  currentAMLTab: AMLTabsEnum;
  currentKYCDocsTab: KYCDocsTabsEnum;
  individualKYCTab: IndividualKYCTabsEnum;
  TreasuryTab: TreasuryTabsEnum;
}


const initialState: TabsState = {
  currentKYCTab: KYCTabsEnum.INDIVIDUAL,
  currentVendorTab: VendorTabsEnum.FINCRA,
  currentCardsTab: CardsTabsEnum.CARDS,
  currentAMLTab: AMLTabsEnum.INDIVIDUAL,
  currentKYCDocsTab: KYCDocsTabsEnum.IDDOCS,
  individualKYCTab: IndividualKYCTabsEnum.USER_DETAILS,
  TreasuryTab: TreasuryTabsEnum.USD,
};

const TabsSlice = createSlice({
  name: "Tabs",
  initialState,
  reducers: {
    setCurrentKYCTab: (state, action: PayloadAction<KYCTabsEnum>) => {
      state.currentKYCTab = action.payload;
    },
    setCurrentVendorTab: (state, action: PayloadAction<VendorTabsEnum>) => {
      state.currentVendorTab = action.payload;
    },
    setCurrentCardsTab: (state, action: PayloadAction<CardsTabsEnum>) => {
      state.currentCardsTab = action.payload;
    },
    setCurrentAMLTab: (state, action: PayloadAction<AMLTabsEnum>) => {
      state.currentAMLTab = action.payload;
    },
    setKYCDocsTab: (state, action: PayloadAction<KYCDocsTabsEnum>) => {
      state.currentKYCDocsTab = action.payload;
    },
    setIndividualKYCTab: (state, action: PayloadAction<IndividualKYCTabsEnum>) => {
      state.individualKYCTab = action.payload;
    },
    setTreasuryTab: (state, action: PayloadAction<TreasuryTabsEnum>) => {
      state.TreasuryTab = action.payload;
    },
  },
});

export const {
    setCurrentKYCTab,
    setCurrentVendorTab,
    setKYCDocsTab,
    setCurrentAMLTab,
    setCurrentCardsTab,
    setIndividualKYCTab,
    setTreasuryTab,
} = TabsSlice.actions;

export default TabsSlice.reducer;
