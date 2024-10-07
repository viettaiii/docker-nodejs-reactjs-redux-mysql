import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { menuBottom } from "../../assets/menuBottomHeader";
import HeaderBottomItem from "../Header/HeaderBottomItem";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
function NavbarDeskTop() {
  return (
    <div className="container-xl header-bottom">
      <ul className="items">
        {menuBottom.map((item, idx) => (
          <HeaderBottomItem key={idx} item={item} />
        ))}
      </ul>
      <div className="text-white d-flex gap-1 justify-content-center align-items-center ms-5">
        <div className="px-1 py-1">
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className="px-1 py-1">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(NavbarDeskTop);
