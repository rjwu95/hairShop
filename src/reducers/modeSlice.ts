import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Mode = "region" | "current";
export type ModeSlice = {
  value: Mode;
};

const changeModeReducer: CaseReducer<ModeSlice, PayloadAction<Mode>> = (
  state,
  { payload }
) => {
  console.log("reducer!!!!!");
  state.value = payload;
};
const initialState: ModeSlice = {
  value: "region",
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode: changeModeReducer,
  },
});

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;
