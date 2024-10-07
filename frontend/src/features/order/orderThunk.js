import httpRequest from "../../api/httpRequest";

export const addOrderMeAsync = async (url, inputs, thunkAPI) => {
  try {
    const { data } = await httpRequest.post(url, inputs);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
export const getOrdersMeAsync = async (url, thunkAPI) => {
  try {
    const { data } = await httpRequest.get(url);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
