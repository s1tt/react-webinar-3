import { useCallback } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useInit from "../hooks/use-init";
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
    // getInfo: state.login.getInfo,
  }));

  const callbacks = {
    getInfo: useCallback(() => {
      store.actions.login.getInfo();
    }, [store]),
  };

  useInit(() => {
    store.actions.login.getInfo();
  }, [select.isAuthorized]);

  // useLayoutEffect(() => {
  //   callbacks.getInfo();
  // }, []);
  console.log("render");
  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        {console.log(select.isAuthorized)}
        <Route
          path={"/profile"}
          element={
            select.isAuthorized ? <Profile /> : <Navigate to={"/login"} />
          }
          // element={<Profile />}
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
