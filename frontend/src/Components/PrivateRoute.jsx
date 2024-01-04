import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const auth = useSelector(store => store.AuthReducer);
    return auth.isAuth == false ? <Navigate to={"/login"} replace={true} /> : children;
}
export default PrivateRoute;