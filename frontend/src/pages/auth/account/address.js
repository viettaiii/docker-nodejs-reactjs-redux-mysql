import { Button } from "react-bootstrap";
import Account from ".";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteAddressMe,
  getAddressesMe,
  addAddressMe,
} from "../../../features/address/addressSlice";
import ModalConfirmation from "../../../components/Modal/ModalConfirmation";
import { setIsLoadingComp } from "../../../features/loadingCompSlice";
import FormAddress from "../../../components/Form/FormAddress";
import { resetFormAddress } from "../../../features/formAddressSlice";
import { toastDanger } from "../../../utils/toast";

function Address() {
  const dispatch = useDispatch();
  const { addresses } = useSelector((store) => store.address);
  const { address } = useSelector((store) => store.formAddress);
  const [addressId, setAddressId] = useState(null);
  const [isAddNew, setIsAddNew] = useState(false);
  const [addressEdit, setAddressEdit] = useState(null);
  const deleteAddress = async (id) => {
    dispatch(setIsLoadingComp(true));
    const { payload } = await dispatch(deleteAddressMe(id));
    if (payload.status === 200) await dispatch(getAddressesMe());
    dispatch(setIsLoadingComp(false));
    setAddressId(null);
  };

  const handleAddNewAddress = async () => {
    const { phoneNumber, province, district, ward, fullName } = address;
    if (!phoneNumber || !province || !district || !ward || !fullName) {
      return toastDanger("Vui lòng điển thông tin!");
    } else {
      dispatch(setIsLoadingComp(true));
      const { payload } = await dispatch(addAddressMe(address));
      if (payload.status === 201) await dispatch(getAddressesMe());
      dispatch(setIsLoadingComp(false));
      dispatch(resetFormAddress());
      setIsAddNew(false);
    }
  };
  return (
    <Account>
      <h5 className=" mt-sm-4 fw-light">ĐỊA CHỈ CỦA BẠN</h5>
      <div className="mt-4">
        <Button variant="danger btn-md" onClick={() => setIsAddNew(true)}>
          Thêm địa chỉ
        </Button>
      </div>
      {addresses && addresses.length > 0 && (
        <div className="mt-3">
          {addresses.map((address, i) => (
            <div
              key={i}
              className="border-top py-2 d-flex flex-column gap-3 position-relative"
            >
              <span>
                <strong>Họ tên</strong>: {address.fullName}
                {(address.using || i === 0) && (
                  <small className="text-size-12 text-success ms-3 fw-light">
                    Địa chỉ mặc định
                  </small>
                )}
              </span>
              <span>
                <strong> Địa chỉ</strong> : {address.residence}, {address.ward},
                {address.district}, {address.province}, {address.country}
              </span>
              <span>
                {" "}
                <strong>Số điện thoại</strong>: {address.phoneNumber}
              </span>
              <span className="d-flex gap-3 position-absolute p-center-y right-1 max-lg-none ">
                <span
                  className="text-danger cursor"
                  onClick={() => {
                    setAddressEdit(address.id);
                    // dispatch(setFromAddress(address));
                  }}
                >
                  Sửa
                </span>
                {!address.using && (
                  <span
                    className="text-info cursor"
                    onClick={() => setAddressId(address.id)}
                  >
                    Xóa
                  </span>
                )}
              </span>
              <span className="d-flex gap-3 justify-content-end d-none max-lg-display">
                <span
                  className="text-danger cursor"
                  onClick={() => {
                    setAddressEdit(address.id);
                    // dispatch(setFromAddress(address));
                  }}
                >
                  Sửa
                </span>
                {!address.using && (
                  <span
                    className="text-info cursor"
                    onClick={() => setAddressId(address.id)}
                  >
                    Xóa
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
      <ModalConfirmation
        onSave={() => deleteAddress(addressId)}
        onReject={() => setAddressId(null)}
        show={addressId}
        title={"Xác nhận xóa địa chỉ ?"}
      />

      <ModalConfirmation
        onSave={() => handleAddNewAddress()}
        onReject={() => {
          dispatch(resetFormAddress());
          setIsAddNew(false);
        }}
        show={isAddNew}
        title={"THÊM ĐỊA CHỈ MỚI ?"}
      >
        <FormAddress />
      </ModalConfirmation>
      {/* <ModalConfirmation
            onSave={() => handleAddNewAddress()}
            onReject={() => {
              dispatch(resetFormAddress());
              setAddressEdit(null);
            }}
            show={addressEdit}
            title={"CHỈNH SỬA ĐỊA CHỈ ?"}
          >
            <FormAddress />
          </ModalConfirmation> */}
    </Account>
  );
}

export default Address;
