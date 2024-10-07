import PropTypes from "prop-types";

function Section({ children }) {
  return <div className="section">{children}</div>;
}

Section.propTypes = {
  children: PropTypes.node,
};
export default Section;
