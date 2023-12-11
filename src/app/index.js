import { Route, Routes } from "react-router-dom";
import useSelector from "../store/use-selector";
import Basket from "./basket";
import Main from "./main";
import ProductDetails from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
