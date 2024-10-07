import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    phoneNumber: "",
    province: "",
    fullName: "",
    residence: "",
    district: "",
    ward: "",
    country: "VN",
    note: "",
  },
};

const formAddressSlice = createSlice({
  name: "formAddress",
  initialState,
  reducers: {
    changeFormAddress: (state, action) => {
      const { name, value } = action.payload;
      state.address[name] = value;
    },
    setFromAddress: (state, action) => {
      const {
        phoneNumber,
        province,
        fullName,
        residence,
        district,
        ward,
        country,
        note,
      } = action.payload;
      state.address.phoneNumber = phoneNumber;
      state.address.province = province;
      state.address.fullName = fullName;
      state.address.residence = residence;
      state.address.district = district;
      state.address.ward = ward;
      state.address.country = country;
      state.address.note = note;
    },
    resetFormAddress: (state) => {
      state.address = {
        phoneNumber: "",
        province: "",
        fullName: "",
        residence: "",
        district: "",
        ward: "",
        country: "VN",
        note: "",
      };
    },
  },
});
export const { changeFormAddress, resetFormAddress, setFromAddress } =
  formAddressSlice.actions;
export default formAddressSlice.reducer;
