import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Address = {
  value: string;
  modal: boolean;
};

export const changeAddress: CaseReducer<Address, PayloadAction<string>> = (
  state,
  { payload }
) => {
  state.value = payload;
};
export const toggleAddressModal: CaseReducer<Address> = (state) => {
  state.modal = !state.modal;
};

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    value: "",
    modal: false,
  },
  reducers: {
    changeAddress,
    toggleAddressModal,
  },
});

export default addressSlice.reducer;
