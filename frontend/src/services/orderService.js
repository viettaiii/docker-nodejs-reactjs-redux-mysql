import { resetFormAddress } from "../features/formAddressSlice";
import { setIsLoadingComp } from "../features/loadingCompSlice";
import { addOrderMe, getOrdersMe } from "../features/order/orderSlice";
import { clientRoutes } from "../routes";
import { calculatePriceForDiscount } from "../utils/calculatePrice";
import { toastSuccess } from "../utils/toast";

export const handlePaymentService = async (
  { cart, address, status },
  dispatch,
  navigate
) => {
  const productItems = [];
  const ordersLine = [];
  cart.cartItems.forEach((item) => {
    const orderLine = {
      qty: item.qty,
      productItemId: item.productItemId,
      price: calculatePriceForDiscount(
        item.productItem.product.price,
        item.productItem.product.discount
      ),
    };
    const productItem = {
      image: item.productItem.image,
      qty: item.qty,
      price: calculatePriceForDiscount(
        item.productItem.product.price,
        item.productItem.product.discount
      ),
      colorValue: item.productItem.color.value,
      name: item.productItem.product.name,
      slug: item.productItem.product.slug,
    };
    ordersLine.push(orderLine);
    productItems.push(productItem);
  });
  const inputs = {
    productItems,
    ordersLine,
    address,
    status,
  };
  dispatch(setIsLoadingComp(true));
  const { payload } = await dispatch(addOrderMe(inputs));
  if (payload.status === 200) {
    toastSuccess(payload.message);
    await dispatch(getOrdersMe());
    navigate(clientRoutes.checkout + "/cam-on/" + payload.data.id);
  }
  dispatch(setIsLoadingComp(false));
  dispatch(resetFormAddress());
};
