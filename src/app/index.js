import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../containers/protectedRoute";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import Article from "./article";
import Basket from "./basket";
import Login from "./login";
import Main from "./main";
import Profile from "./profile";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const store = useStore();

  const select = useSelector((state) => ({
    isAuthorized: state.login.authorized,
    user: state.login.userData,
    waiting: state.login.waiting,
  }));

  useEffect(() => {
    const fetchData = async () => {
      await store.actions.login.getInfo();
    };
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={
            select.isAuthorized ? <Navigate to={"/profile"} /> : <Login />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isAuthorized={select.isAuthorized}
              waiting={select.waiting}
            >
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
