import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Address = {
  value: string;
  modal: boolean;
};

const changeAddressReducer: CaseReducer<Address, PayloadAction<string>> = (
  state,
  { payload }
) => {
  state.value = payload;
};
const toggleAddressModalReducer: CaseReducer<Address> = (state) => {
  state.modal = !state.modal;
};

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    value: "",
    modal: false,
  },
  reducers: {
    changeAddress: changeAddressReducer,
    toggleAddressModal: toggleAddressModalReducer,
  },
});

export const { changeAddress, toggleAddressModal } = addressSlice.actions;

export default addressSlice.reducer;
