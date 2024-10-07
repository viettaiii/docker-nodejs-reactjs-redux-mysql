import httpRequest from "../../api/httpRequest";

export const getProductsAsync = async (url, params, thunkAPI) => {
  try {
    const { data } = await httpRequest.get(url, params);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createProductAsync = async (url, inputs, thunkAPI) => {
  try {
    const { data } = await httpRequest.post(url, inputs);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteProductAsync = async (url, inputs, thunkAPI) => {
  try {
    const { data } = await httpRequest.delete(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const updateProductAsync = async (url, inputs, thunkAPI) => {
  try {
    const { data } = await httpRequest.patch(url, inputs);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteManyProductAsync = async (url, slugs, thunkAPI) => {
  try {
    const { data } = await httpRequest.delete(url, { data: { slugs } });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
