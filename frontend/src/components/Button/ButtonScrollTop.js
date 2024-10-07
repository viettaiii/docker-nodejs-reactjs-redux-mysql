import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
function ButtonScrollTop() {
  const [show, setShow] = useState();
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) setShow(true);
    if (scrollY <= 200) setShow(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (!show) return null;
  return (
    <Button
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      variant="primary btn-xs p-1"
      className="position-fixed bottom-10 right-1 z-3"
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </Button>
  );
}

export default ButtonScrollTop;
