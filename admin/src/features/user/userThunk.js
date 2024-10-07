import httpRequest from "../../api/httpRequest";

export const getUsersAsync = async (url, params, thunkAPI) => {
  try {
    const { data } = await httpRequest.get(url, params);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
