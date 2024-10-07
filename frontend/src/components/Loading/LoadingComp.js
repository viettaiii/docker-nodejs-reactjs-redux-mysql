import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setIsLoadingComp } from "../../features/loadingCompSlice";
function LoadingComp({}) {
  const { isLoadingComp } = useSelector((store) => store.loadingComp);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoadingComp(true));
    const timeId = setTimeout(() => {
      dispatch(setIsLoadingComp(false));
    }, 1);
    return () => {
      clearTimeout(timeId);
    };
  }, [location.pathname]);
  return (
    <>
      <AnimatePresence>
        {isLoadingComp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: [0.5, 0.3, 0] }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="loading-page"
          >
            <div></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LoadingComp;
