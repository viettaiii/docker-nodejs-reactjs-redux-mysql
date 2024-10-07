import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
function FrameHover({ children, isHovered }) {
  return <AnimatePresence>{isHovered && children}</AnimatePresence>;
}

export default FrameHover;

FrameHover.propTypes = {
  children: PropTypes.node,
  isHovered: PropTypes.bool,
};
