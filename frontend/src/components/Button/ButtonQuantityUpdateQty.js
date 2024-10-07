import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import SpinnerButton from "../Loading/SpinnerButton";
function ButtonQuantityUpdateQty({
  qty = 1,
  className,
  handleChangeQty,
  increaseQty,
  decreaseQty,
  as = "span",
  disabled,
}) {
  const Comp = as;
  return (
    <Comp className={`button-quantity ${className ? className : ""}`}>
      <Button
        disabled={disabled}
        onClick={async () => {
          if (disabled) return;
        await  decreaseQty();
        }}
        className=" position-relative"
      >
        -
        <SpinnerButton show={disabled} />
      </Button>
      <span>
        <Form.Control name="qty" onChange={handleChangeQty} value={qty} />
      </span>
      <Button
        disabled={disabled}
        className=" position-relative"
        onClick={async () => {
          if (disabled) return;
         await increaseQty();
        }}
      >
        +
        <SpinnerButton show={disabled} />
      </Button>
    </Comp>
  );
}

export default ButtonQuantityUpdateQty;
ButtonQuantityUpdateQty.propTypes = {
  qty: PropTypes.number.isRequired,
  className: PropTypes.string,
  handleChangeQty: PropTypes.func,
  increaseQty: PropTypes.func,
  decreaseQty: PropTypes.func,
};
