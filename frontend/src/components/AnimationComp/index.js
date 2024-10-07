import { motion } from "framer-motion";
import PropTypes from "prop-types";
function AnimationComp({ children }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition="transition"
    >
      {children}
    </motion.div>
  );
}

export default AnimationComp;

// Animation
const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0.5 },
  transition: { duration: 3, ease: "easeOut" },
};

AnimationComp.propTypes = {
  children: PropTypes.node.isRequired,
};
