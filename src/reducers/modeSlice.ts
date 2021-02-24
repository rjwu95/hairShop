import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Mode = "region" | "current";

export const changeMode: CaseReducer<Mode, PayloadAction<Mode>> = (
  state,
  { payload }
) => {
  state = payload;
};
const initialState: Mode = "region";

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode,
  },
});

export default modeSlice.reducer;
