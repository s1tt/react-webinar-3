import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import "./style.css";

const LoginPanel = () => {
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector((state) => ({
    isAuthorized: state.login.authorized,
    userData: state.login.userData,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.login.logOut();
      navigate("/");
    }, [store]),
  };
  return (
    <div className="loginPanel">
      {select.isAuthorized ? (
        <>
          <Link to={"/profile"}>{select.userData.profile.name}</Link>
          <button type="button" onClick={callbacks.onLogout}>
            Выход
          </button>
        </>
      ) : (
        <button type="button" onClick={() => navigate("/login")}>
          Вход
        </button>
      )}
    </div>
  );
};

export default LoginPanel;
