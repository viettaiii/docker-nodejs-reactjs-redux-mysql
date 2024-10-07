import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
const sidebarMenu = [
  {
    icon: "mdi mdi-view-dashboard",
    text: "Dashboard",
    to: "/admin",
  },
  {
    icon: "mdi mdi-view-dashboard",
    text: "Catalog",
    iconRight: "mdi mdi-chevron-right",
    subItems: [
      {
        text: "Products",
        to: "/admin/products",
      },
      {
        text: "Categories",
        to: "/admin/categories",
      },
      {
        text: "Providers",
        to: "/admin/providers",
      },
      {
        text: "Orders",
        to: "/admin/orders",
      },
      {
        text: "Customers",
        to: "/admin/customers",
      },
    ],
  },
  {
    icon: "mdi mdi-view-dashboard",
    text: "Dashboard",
    to: "/order",
  },
];

function Sidebar() {
  const [idxShow, setIdxShow] = useState(null);
  const handleShow = (index) => {
    if (idxShow === index) return setIdxShow(null);
    setIdxShow(index);
  };

  const createNav = (item) => {
    if (!item.iconRight)
      return (
        <Link to={item.to} className="text">
          {item.text}
        </Link>
      );
    return <span className="text">{item.text}</span>;
  };
  const createMenuSideBar = (sidebarMenu) => {
    return sidebarMenu.map((item, key) => {
      return (
        <>
          <div key={key} className="item">
            <span className="icon icon-lg">
              <span className={item.icon}></span>
            </span>
            {createNav(item)}

            {item.iconRight && (
              <motion.span
                animate={key === idxShow ? { rotate: 90 } : { rotate: 0 }}
                className="icon icon-lg"
                onClick={() => handleShow(key)}
              >
                <span className={item.iconRight}></span>
              </motion.span>
            )}
          </div>
          <AnimatePresence>
            {item.iconRight && key === idxShow && (
              <motion.ul key={key} className="sub-items">
                {item.subItems.map((subItem, keySub) => (
                  <li key={keySub}>
                    <Link to={subItem.to}>{subItem.text}</Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      );
    });
  };
  return (
    <div className="sidebar d-flex gap-2 flex-column">
      <div className="logo text-center w-100 fs-3">E-COMMERCE</div>
      <div className="items">{createMenuSideBar(sidebarMenu)} </div>
    </div>
  );
}

export default Sidebar;
