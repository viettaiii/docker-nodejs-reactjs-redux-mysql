import { FloatingLabel, Form } from "react-bootstrap";
import { toastInfo } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { changeFormAddress } from "../../features/formAddressSlice";
import { useEffect, useRef, useState } from "react";
import useHideOnClickOutside from "../../hooks/useHideOnClickOutSide";
import axios from "axios";
import PropTypes from "prop-types";
import { setIsLoadingComp } from "../../features/loadingCompSlice";
function FormAddress({ isSelected }) {
  const { user } = useSelector((store) => store.auth);
  const { address } = useSelector((store) => store.formAddress);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(changeFormAddress({ name: e.target.name, value: e.target.value }));
  };
  const [addresses, setAddresses] = useState(null);
  const cityRef = useRef();
  const districtRef = useRef();
  const wardRef = useRef();
  const [isShowSelectOptionCity, setIsShowSelectOptionCity] =
    useHideOnClickOutside(cityRef);
  const [isShowSelectOptionDistrict, setIsShowSelectOptionDistrict] =
    useHideOnClickOutside(districtRef);
  const [isShowSelectOptionWard, setIsShowSelectOptionWard] =
    useHideOnClickOutside(wardRef);
  const [city, setCity] = useState();
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  useEffect(() => {
    const getAddressesAsync = async () => {
      try {
        const { data } = await axios.get(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        setAddresses(data);
        localStorage.setItem("addresses", JSON.stringify(data));
      } catch (error) {}
    };
    dispatch(setIsLoadingComp(true));
    getAddressesAsync();
    dispatch(setIsLoadingComp(false));
  }, []);
  const handleSelectCity = (city) => {
    dispatch(changeFormAddress({ name: "province", value: city.name }));
    // setCity(city);
    // setDistrict(null);
    // setWard(null);
  };
  const handleSelectDistrict = (district) => {
    dispatch(changeFormAddress({ name: "district", value: district.name }));
    // setDistrict(district);
    // setWard(null);
  };

  const handleSelectWard = (ward) => {
    dispatch(changeFormAddress({ name: "ward", value: ward.name }));
    // setWard(ward);
  };
  return (
    <Form className="">
      <FloatingLabel
        controlId="floatingInputGrid"
        label="Email"
        className="mb-2"
        disabled
      >
        <Form.Control
          size="sm"
          type="email"
          value={user.email}
          disabled
          placeholder="name@example.com"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputGrid"
        label="Họ và tên"
        className="mb-2"
      >
        <Form.Control
          type="text"
          placeholder="Nguyen Viet Tai"
          disabled={isSelected}
          value={address?.fullName}
          name="fullName"
          onChange={handleChange}
        />
      </FloatingLabel>

      <div className="d-flex mb-2">
        <FloatingLabel
          controlId="floatingInputGrid"
          label="Số điện thoại (tùy chọn)"
          className="w-100"
        >
          <Form.Control
            type="text"
            placeholder="329638260"
            disabled={isSelected}
            value={address?.phoneNumber}
            name="phoneNumber"
            onChange={(e) => {
              // if (address.phoneNumber.length >= 10) return;
              handleChange(e);
            }}
          />
        </FloatingLabel>
      </div>
      <FloatingLabel
        controlId="floatingInputGrid"
        label="Địa chỉ (tùy chọn)"
        className="mb-2"
      >
        <Form.Control
          type="text"
          placeholder="124 Nguyen Tat Thanh"
          value={address?.residence}
          name="residence"
          onChange={handleChange}
        />
      </FloatingLabel>
      <div className="d-flex mb-2 position-relative" ref={cityRef}>
        <FloatingLabel
          controlId="floatingInputGrid"
          label="Tỉnh thành"
          className="w-100 d-flex"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            name="province"
            value={address?.province || (city?.name ? city.name : "")}
            onChange={handleChange}
          ></Form.Control>{" "}
        </FloatingLabel>
        {/* {true && (
          <SelectOptions
            setIsShow={setIsShowSelectOptionCity}
            addresses={addresses}
            handleSelect={handleSelectCity}
          ></SelectOptions>
        )} */}
      </div>
      <div className="d-flex mb-2 position-relative" ref={districtRef}>
        <FloatingLabel
          controlId="floatingInputGrid"
          label="Quận huyện"
          className="w-100 d-flex"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            name="district"
            value={address?.district || (district?.name ? district.name : "")}
            onChange={handleChange}
          ></Form.Control>{" "}
        </FloatingLabel>
        {/* {isShowSelectOptionDistrict && (
          <SelectOptions
            setIsShow={setIsShowSelectOptionDistrict}
            addresses={city?.districts}
            handleSelect={handleSelectDistrict}
          ></SelectOptions>
        )} */}
      </div>
      <div className="d-flex mb-2 position-relative" ref={wardRef}>
        <FloatingLabel
          controlId="floatingInputGrid"
          label="Phường xã"
          className="w-100 d-flex"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            name="ward"
            // disabled={isSelected || (!address?.ward && !district?.name)}
            value={address?.ward || (ward?.name ? ward.name : "")}
            onChange={handleChange}
          ></Form.Control>{" "}
          {/* <div
            className="border rounded-2 px-3 flex-center cursor"
            onClick={() => {
              if (!district) return toastInfo("Vui lòng chọn huyện");
              setIsShowSelectOptionWard(true);
            }}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </div> */}
        </FloatingLabel>
        {isShowSelectOptionWard && (
          <SelectOptions
            setIsShow={setIsShowSelectOptionWard}
            addresses={district?.wards}
            handleSelect={handleSelectWard}
          ></SelectOptions>
        )}
      </div>
      <FloatingLabel controlId="floatingTextarea2" label="Ghi chú (tùy chọn)">
        <Form.Control
          as="textarea"
          placeholder="Ghi chú"
          style={{ height: "70px" }}
          disabled={isSelected}
          value={address?.note}
          name="note"
          onChange={handleChange}
        />
      </FloatingLabel>
    </Form>
  );
}

FormAddress.propTypes = {
  isSelected: PropTypes.bool,
};

export default FormAddress;
function SelectOptions({ addresses, handleSelect, setIsShow }) {
  if (!addresses) return null;
  return (
    <div className="select_options scrollbar-primary">
      <span>---</span>
      {addresses.map((address, index) => (
        <span
          key={index}
          onClick={() => {
            handleSelect(address);
            setIsShow(false);
          }}
        >
          {address?.name}
        </span>
      ))}
    </div>
  );
}
SelectOptions.propTypes = {
  addresses: PropTypes.array,
  handleSelect: PropTypes.func,
  setIsShow: PropTypes.func,
};
