import { useDispatch, useSelector } from "react-redux";
import { setSideBarOpen } from "../features/sideBarSlice";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoutAuth } from "../features/auth/authSlice";
import { setIsLoadingComp } from "../features/loadingCompSlice";
import { toastSuccess } from "../utils/toast";

function NavBar() {
  const dispatch = useDispatch();
  const { isSideBarOpen } = useSelector((store) => store.sideBar);
  return (
    <div className="navbar w-100">
      <div className="left">
        <span
          className="mdi mdi-menu icon-lg"
          onClick={() => dispatch(setSideBarOpen(!isSideBarOpen))}
        ></span>
      </div>
      <div className="right">
        <div className="item">
          <span className="mdi mdi-moon-waning-crescent icon-md"></span>
        </div>
        <div className="item">
          <span className="mdi mdi-bell icon-md"></span>
          <span className="text">10</span>
        </div>
        <Dropdown className="item">
          <Dropdown.Toggle
            variant="success"
            className="avatar"
            id="dropdown-basic"
          >
            A
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={"/admin/dashboard"}>Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/admin/profile"}> Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <div
                onClick={async () => {
                  dispatch(setIsLoadingComp(true));
                  const { payload } = await dispatch(logoutAuth());
                  toastSuccess(payload.message);
                  dispatch(setIsLoadingComp(false));
                }}
              >
                Đăng xuất
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default NavBar;
