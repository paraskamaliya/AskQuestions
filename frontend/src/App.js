import Navbar from "./Components/Navbar";
import AllRoutes from "./Components/AllRoutes";
import PlusButton from "./Components/PlusButton";
import { useSelector } from "react-redux";
function App() {
  const isAuth = useSelector(store => store.AuthReducer.isAuth);
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      {isAuth && <PlusButton />}
    </div>
  );
}

export default App;
