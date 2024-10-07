import { useEffect, useState } from "react";
import PropTypes from "prop-types";
function useHideOnClickOutside(elementToHide, initialVisibility = false) {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        elementToHide.current &&
        !elementToHide.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    }

    // Thêm sự kiện click toàn trang
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Loại bỏ sự kiện khi hook bị huỷ
      document.removeEventListener("click", handleClickOutside);
    };
  }, [elementToHide]);

  return [isVisible, setIsVisible];
}

export default useHideOnClickOutside;

useHideOnClickOutside.propTypes = {
  elementToHide: PropTypes.node,
  initialVisibility: PropTypes.bool,
};
