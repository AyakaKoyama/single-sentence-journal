import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ColorModeScript, UIProvider } from "@yamada-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeScript />
    <UIProvider>
      <App />
    </UIProvider>
  </React.StrictMode>
);
