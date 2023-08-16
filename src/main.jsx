import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Home from "./routes/Home.jsx";
import Averages from "./routes/Averages";
import AddMetrics from "./routes/AddMetrics.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "metrics",
    element: <Home />,
    children: [
      {
        path: "add",
        element: <AddMetrics />,
      },
      {
        path: "averages",
        element: <Averages />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
