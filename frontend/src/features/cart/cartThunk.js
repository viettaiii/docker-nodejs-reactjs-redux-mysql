import httpRequest from "../../api/httpRequest";

export const getCartMeAsync = async (url, thunkAPI) => {
  try {
    const { data } = await httpRequest.get(url);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};

export const addCartMeAsync = async (url, inputs, thunkAPI) => {
  try {
    const { data } = await httpRequest.post(url, inputs);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
export const deleteCartItemMeAsync = async (url, thunkAPI) => {
  try {
    const { data } = await httpRequest.delete(url);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
