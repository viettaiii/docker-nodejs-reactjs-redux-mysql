import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { clientRoutes } from "../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
function Breadcrumb({ title, titles = [] }) {
  const createBreadcrumb = () => {
    if (!titles)
      return (
        <div className="container ">
          <Link
            to={clientRoutes.home}
            className="breadcrumb__fs-13 hover-color-secondary text-decoration-none"
          >
            Trang chủ
          </Link>
          <FontAwesomeIcon
            className="px-3 breadcrumb__fs-13"
            icon={faAngleRight}
          />
          <span className="text-secondary breadcrumb__fs-13">{title}</span>
        </div>
      );
    return (
      <div className="container ">
        <Link
          to={clientRoutes.home}
          className="breadcrumb__fs-13 hover-color-secondary text-decoration-none"
        >
          Trang chủ
        </Link>

        {titles.map((t, index) => (
          <Fragment key={index}>
            <FontAwesomeIcon
              className="px-3 breadcrumb__fs-13"
              icon={faAngleRight}
            />
            <Link
              to={t.to}
              className="breadcrumb__fs-13 hover-color-secondary text-decoration-none"
            >
              <span
                className={` breadcrumb__fs-13 ${
                  titles.length - 1 === index ? "text-secondary" : ""
                }`}
              >
                {t.title}
              </span>
            </Link>
          </Fragment>
        ))}
      </div>
    );
  };
  return (
    <div className="container-fuild breadcrumb__breadcrumb">
      {createBreadcrumb()}
    </div>
  );
}

export default React.memo(Breadcrumb);

Breadcrumb.propTypes = {
  title: PropTypes.string,
  titles: PropTypes.array,
};
