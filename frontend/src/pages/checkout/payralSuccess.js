import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handlePaymentService } from "../../services/orderService";
import { Spinner } from "react-bootstrap";

function PaymentSuccess() {
  const { cart } = useSelector((store) => store.cart);
  const { address } = useSelector((store) => store.formAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const onPaymentSuccess = async () => {
      await handlePaymentService(
        {
          cart,
          address,
          status: "completed",
        },
        dispatch,
        navigate
      );
    };
    onPaymentSuccess();
  }, []);
  return (
    <div className="container py-5 mt-2 flex-center">
      <h1>Redirect</h1>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default PaymentSuccess;
