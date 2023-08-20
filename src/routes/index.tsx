import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@pages/index";

const Home = React.lazy(() => import("@pages/home"));
const Contact = React.lazy(() => import("@pages/contact"));
const Analytics = React.lazy(() => import("@pages/analytics"));
const NotFound = React.lazy(() => import("@pages/notFound"));

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index:true,
        element: <Home />
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
