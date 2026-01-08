import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { RouterConfig } from "./RouterConfig.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <h1>SIMPLE AUTHENTICATION</h1>
    </>

    <AuthContextProvider>
      <RouterProvider router={RouterConfig} />
    </AuthContextProvider>
  </StrictMode>
);
