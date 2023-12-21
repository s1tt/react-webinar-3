import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import config from "./config";
import { ServicesContext } from "./context";
import Services from "./services";

const services = new Services(config);

const root = createRoot(document.getElementById("root"));

// Первый рендер приложения
root.render(
  <Provider store={services.redux}>
    <ServicesContext.Provider value={services}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServicesContext.Provider>
  </Provider>
);
