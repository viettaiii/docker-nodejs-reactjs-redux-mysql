import { Helmet } from "react-helmet-async";
import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/no-image.webp";
function HelmetCustom({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" type="image/png" href={logo} />
    </Helmet>
  );
}

export default React.memo(HelmetCustom);

HelmetCustom.propTypes = {
  title: PropTypes.string,
};
