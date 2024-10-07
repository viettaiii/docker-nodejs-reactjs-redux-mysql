import { sliders2 } from "../../assets/sliders";
import React from "react";
import { motion } from "framer-motion";
import LazyImage from "../../components/LazyImage";
function Banner() {
  return (
    <div className="container my-4">
      <div className="section row">
        {sliders2.map((image, idx) => (
          <motion.div
            animate={{
              y: [0, 14, 12, 15, 14, 12, 13, 10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 3 - 0.4 * idx,
              ease: "easeOut",
            }}
            key={idx}
            className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2  d-flex justify-content-center"
          >
            <LazyImage className="section__item" src={image} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Banner);
