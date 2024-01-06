import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const auth = useSelector(store => store.AuthReducer);
    const location = useLocation();
    return auth.isAuth == false ? <Navigate to={"/login"} state={location.pathname} replace={true} /> : children;
}
export default PrivateRoute;