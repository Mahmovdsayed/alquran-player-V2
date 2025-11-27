import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReciterState {
  selectedReciterId: string;
}

const initialState: ReciterState = {
  selectedReciterId: "ar.alafasy",
};

export const reciterSlice = createSlice({
  name: "reciter",
  initialState,
  reducers: {
    setSelectedReciter: (state, action: PayloadAction<string>) => {
      state.selectedReciterId = action.payload;
    },
  },
});

export const { setSelectedReciter } = reciterSlice.actions;
export default reciterSlice.reducer;
