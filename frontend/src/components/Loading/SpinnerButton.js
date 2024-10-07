import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
function SpinnerButton({
  variant = "danger",
  animation = "border",
  size = "sm",
  show,
}) {
  if (!show) return null;
  return (
    <div className="position-absolute p-center">
      <Spinner animation={animation} variant={variant} size={size} />
    </div>
  );
}

export default SpinnerButton;

SpinnerButton.propTypes = {
  variant: PropTypes.string,
  animation: PropTypes.string,
  size: PropTypes.string,
  show: PropTypes.bool,
};
