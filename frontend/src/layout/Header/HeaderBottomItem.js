import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { easeInOut, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../routes";

import PropTypes from "prop-types";
import { navigateAndAttachQuery } from "../../utils/attachQueryToURL";
import { toastInfo } from "../../utils/toast";
const firstMenuItem1 = {
  initial: { y: 100, opacity: 0, display: "none" },
  hover: { y: 0, opacity: 1, display: "block" },
  exit: { y: 100, opacity: 0, display: "none" },
  transition: { duration: 1, ease: easeInOut(2) },
};
const firstMenuItem2 = {
  initial: { y: 100, opacity: 0, display: "none" },
  hover: { y: 0, opacity: 1, display: "flex" },
  exit: { y: 100, opacity: 0 },
  transition: { duration: 1, ease: easeInOut(2) },
};
const subMenuIconRight = {
  initial: { height: 0, opacity: 0 },
  hover: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 1, ease: easeInOut(4) },
};
const HeaderBottomItem = ({ item }) => {
  const [isHoverItem1, setIsHoverItem1] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      onMouseEnter={() => setIsHoverItem1(true)}
      onMouseLeave={() => setIsHoverItem1(false)}
      className="item"
    >
      <div
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

          navigateAndAttachQuery(clientRoutes.product.search, navigate, {
            name: item.title,
          });
        }}
        className="link"
      >
        {item.title}
      </div>
      {item.iconDown && <FontAwesomeIcon icon={item.iconDown} />}
      {item.subMenu &&
        (item.title === "IPhone" ? (
          <motion.ul
            variants={firstMenuItem2}
            initial="initial"
            animate={`${isHoverItem1 ? "hover" : "exit"}`}
            className="iphone-submenu"
          >
            {item.subMenu.map((subItem, idx2) => (
              <li className="iphone-sub-item" key={idx2 + 10}>
                <span
                  title={subItem.title}
                  onClick={() =>
                    navigateAndAttachQuery(
                      clientRoutes.product.search,
                      navigate,
                      { name: subItem.title }
                    )
                  }
                  className="iphone-sub-link"
                >
                  {subItem.title}
                </span>
                <div className="iphone-sub-item-2">
                  {subItem.items.map((name, ipIdx) => (
                    <span
                      onClick={() =>
                        navigateAndAttachQuery(
                          clientRoutes.product.search,
                          navigate,
                          { name: name }
                        )
                      }
                      title={name}
                      key={ipIdx}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.ul
            variants={firstMenuItem1}
            initial="initial"
            animate={`${isHoverItem1 ? "hover" : "exit"}`}
            className="submenu-first"
          >
            {item.subMenu.map((subItem, idx2) => (
              <SubItem2
                onClick={() =>
                  navigateAndAttachQuery(
                    clientRoutes.product.search,
                    navigate,
                    {
                      name: subItem.title,
                    }
                  )
                }
                subItem={subItem}
                key={idx2 + 10}
              />
            ))}
          </motion.ul>
        ))}{" "}
    </motion.div>
  );
};

export default HeaderBottomItem;

HeaderBottomItem.propTypes = {
  item: PropTypes.object,
};

const SubItem2 = ({ subItem, onClick }) => {
  const [isHoverItem2, setIsHoverItem2] = useState(false);
  return (
    <motion.span
      onMouseEnter={() => setIsHoverItem2(true)}
      onMouseLeave={() => setIsHoverItem2(false)}
      className="sub-item d-flex justify-content-between"
    >
      <span
        className="sub-link text-black"
        title={subItem.title}
        onClick={onClick}
      >
        {subItem.title}
      </span>
      {subItem.iconRight && (
        <span className="icon">
          <FontAwesomeIcon icon={subItem.iconRight} />
        </span>
      )}
      {subItem.iconRight && (
        <motion.div
          variants={subMenuIconRight}
          initial="initial"
          animate={`${isHoverItem2 ? "hover" : "exit"}`}
          className="sub-menu-2 d-flex flex-column gap-2"
        >
          {subItem.items.map((item3, idx3) => (
            <span title={item3} onClick={onClick} className="link-2" key={idx3}>
              {item3}
            </span>
          ))}
        </motion.div>
      )}
    </motion.span>
  );
};
HeaderBottomItem.propTypes = {
  subItem: PropTypes.object,
  navigateTo: PropTypes.func,
};
