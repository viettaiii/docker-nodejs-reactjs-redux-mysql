// FRAMEWORKS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
// STYLES
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import useHideOnClickOutside from "../../../hooks/useHideOnClickOutSide";
import { useDebounce } from "@uidotdev/usehooks";
import httpRequest from "../../../api/httpRequest";
const SearchSuggest = lazy(() => import("./searchSuggest"));
// FAKE DATA SEARCH
function Search({ className }) {
  const searchRef = useRef();
  const [isVisible, setIsVisible] = useHideOnClickOutside(searchRef, false);
  const [isSearching, setIsSearching] = useState(false);
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedSearchTerm = useDebounce(name, 1000);

  useEffect(() => {
    const getProductsAsync = async () => {
      let result = [];
      try {
        const { data } = await httpRequest.get("/products", {
          params: { name },
        });
        result = data.data;
        setProducts(result);
        setIsSearching(false);
      } catch (error) {
        setIsSearching(false);
      }
    };
    if (debouncedSearchTerm) getProductsAsync();
  }, [debouncedSearchTerm]);
  return (
    <div
      onFocus={() => {
        setIsVisible(true);
      }}
      ref={searchRef}
      // onBlur={() => setIsFocus(false)}
      className={`search ${className}`}
    >
      <Form.Control
        type="text"
        placeholder="Tìm kiếm..."
        name="name"
        onChange={(e) => {
          setIsSearching(true);
          setName(e.target.value);
        }}
        value={name}
      />
      {isSearching && name !== "" ? (
        <FontAwesomeIcon
          className="search-icon top-30"
          icon={faSpinner}
          spinPulse
        />
      ) : (
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
      )}
      <SearchSuggest
        isSearching={(name ? true : false) && isSearching}
        products={name ? products : null}
        isVisible={isVisible}
      />
    </div>
  );
}

// ANIMATION SEARCH

export default Search;

Search.propTypes = {
  className: PropTypes.string,
};
