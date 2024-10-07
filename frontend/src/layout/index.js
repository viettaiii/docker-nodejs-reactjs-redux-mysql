// LAYOUT
import AnimationComp from "../components/AnimationComp";
import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";

// STYLES
function Layout({ children }) {
  return (
    <div className="">
      <AnimationComp>
        <Header />
        {children}
        <Footer />
      </AnimationComp>
    </div>
  );
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};
