import { useEffect } from "react";

function useScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }, []);
  return {};
}

export default useScrollTop;
