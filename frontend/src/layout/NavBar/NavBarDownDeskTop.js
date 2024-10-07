import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
// MY IMPORTS
import { toggleNavBar } from "../../features/navBarSlice";
import { menuBottom } from "../../assets/menuBottomHeader";
import { navigateAndAttachQuery } from "../../utils/attachQueryToURL";
import { clientRoutes } from "../../routes";
import { toastInfo } from "../../utils/toast";

function NavBarDownDeskTop() {
  const navigate = useNavigate();
  const [numberShow, setNumberShow] = useState(100);
  const { isOpen } = useSelector((store) => store.navBar);
  const dispatch = useDispatch();
  const wrapperRef = useRef();

  return (
    <div
      className="wrapper-bar d-lg-none"
      onClick={(e) => {
        if (e.target === wrapperRef.current) {
          dispatch(toggleNavBar());
        }
      }}
      ref={wrapperRef}
    >
      <motion.div
        variants={variants}
        initial="initial"
        exit="exit"
        transition="transition"
        animate={isOpen ? "open" : "exit"}
        className="nav-bar"
      >
        <div className="nav-bar__header">
          <span>DANH MỤC</span>
          <FontAwesomeIcon
            onClick={() => dispatch(toggleNavBar())}
            className="icon-size-sm"
            icon={faClose}
          />
        </div>
        <div className="nav-bar__menu">
          {menuBottom.map((item, idx) => (
            <motion.li
              key={idx}
              animate={numberShow === idx ? "open" : "closed"}
              whileTap={{ scale: 0.97 }}
              className="nav-bar__menu__parent-item"
            >
              <div>
                <span
                  className="cursor"
                  onClick={() => {
                    if (
                      [
                        "Trang chủ",
                        "Giới thiệu",
                        "Chính sách",
                        "Tin tức",
                        "Liên hệ",
                      ].includes(item.title)
                    ) {
                      if (item.title === "Trang chủ") {
                        navigate(clientRoutes.home);
                      } else {
                        toastInfo("Chức năng đang được cập nhật!");
                      }
                      return;
                    }
                    dispatch(toggleNavBar());
                    navigateAndAttachQuery(
                      clientRoutes.product.search,
                      navigate,
                      {
                        name: item.title,
                      }
                    );
                  }}
                >
                  {" "}
                  {item.title}
                </span>

                {item.iconDown && (
                  <motion.span
                    onClick={() => {
                      if (idx === numberShow) {
                        setNumberShow(100);
                        return;
                      }
                      setNumberShow(idx);
                    }}
                    variants={rotateIcon}
                    className="cursor"
                  >
                    <FontAwesomeIcon icon={item.iconDown} />
                  </motion.span>
                )}
              </div>
              <AnimatePresence>
                {item.iconDown && numberShow === idx && (
                  <motion.ul
                    variants={subMenu}
                    initial="initial"
                    exit="exit"
                    data-show={numberShow === idx}
                  >
                    {item.subMenu.map((subItem, idx) => (
                      <NavbarSecondMenu subItem={subItem} key={idx} />
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
const variants = {
  initial: { x: -200, opacity: 0.5 },
  open: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0.5 },
  transition: { duration: 12, ease: "linear" },
};
const subMenu = {
  initial: { opacity: 0, height: 0 },
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 1, easeInOut: 1 },
};

const rotateIcon = {
  initial: { rotate: -90 },
  open: { rotate: 0 },
  closed: { rotate: -90 },
  exit: { rotate: -90 },
  transition: { duration: 1, easeInOut: 1 },
};

export default NavBarDownDeskTop;

const NavbarSecondMenu = ({ subItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <motion.li className="nav-bar__menu__parent-item__submenu__item cursor">
      <div
        onClick={() => {
          dispatch(toggleNavBar());
          navigateAndAttachQuery(clientRoutes.product.search, navigate, {
            name: subItem.title,
          });
        }}
      >
        {subItem.title}
      </div>
      <motion.ul className="">
        {subItem.items &&
          subItem.items.map((sItem, idx2) => (
            <li
              key={idx2}
              className="cursor"
              onClick={() => {
                dispatch(toggleNavBar());
                navigateAndAttachQuery(clientRoutes.product.search, navigate, {
                  name: sItem,
                });
              }}
            >
              <div>{sItem}</div>
            </li>
          ))}
      </motion.ul>
    </motion.li>
  );
};
