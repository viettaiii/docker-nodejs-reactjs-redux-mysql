import {
  addCartMe,
  deleteCartItemMe,
  getCartMe,

} from "../features/cart/cartSlice";

export const updateQtyService = async (inputs, dispatch) => {
  const { payload } = await dispatch(addCartMe(inputs));
  if (payload.status === 200) {
    await dispatch(getCartMe());
  }
};

export const deleteCartItemService = async (id, dispatch) => {
  await dispatch(deleteCartItemMe(id));
  return dispatch(getCartMe());
};

export const addItemToCartService = async (inputs, dispatch) => {
  const { payload } = await dispatch(addCartMe(inputs));
  if (payload.status === 200) {
    await dispatch(getCartMe());
  }
};
//
