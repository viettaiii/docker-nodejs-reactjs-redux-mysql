import { useDispatch } from "react-redux";
import { getUserSuccess } from "../../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setIsLoadingComp } from "../../../features/loadingCompSlice";
import { toastSuccess } from "../../../utils/toast";

function LoginSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setIsLoadingComp(true));
    const getUserAsync = async () => {
      const { payload } = await dispatch(getUserSuccess());
      if (payload.status === 200) {
        toastSuccess(payload.message);
        navigate("/");
      }
    };
    getUserAsync();
    dispatch(setIsLoadingComp(false));
  }, []);
  return <div className="">redirect home</div>;
}

export default LoginSuccess;
