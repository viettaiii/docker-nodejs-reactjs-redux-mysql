import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
function ButtonQuantity({
  qty = 1,
  className,
  handleChangeQty,
  setQty,
  type = "span",
}) {
  const Comp = type;
  return (
    <Comp className={`button-quantity ${className ? className : ""}`}>
      <Button
        onClick={() => {
          if (qty === 1) {
            return;
          }
          setQty((prev) => prev - 1);
        }}
      >
        -
      </Button>
      <span>
        <Form.Control name="qty" onChange={handleChangeQty} value={qty} />
      </span>
      <Button onClick={() => setQty((prev) => prev + 1)}>+</Button>
    </Comp>
  );
}

export default ButtonQuantity;
ButtonQuantity.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qty: PropTypes.number,
  setQty: PropTypes.func,
  type: PropTypes.string,
};
