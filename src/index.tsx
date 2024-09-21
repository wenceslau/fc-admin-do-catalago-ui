import React from "react";
import {BrowserRouter,} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {setupStore} from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {KeycloakProvider} from "./providers/KeycloakProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);
const store = setupStore();

// root.render(
//   // <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <App/>
//       </Provider>
//     </BrowserRouter>
//   // </React.StrictMode>
// );

root.render(
  <Provider store={store}>
    <KeycloakProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </KeycloakProvider>
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
