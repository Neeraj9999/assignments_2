import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import RouteLoader from "@pages/loader/routeLoader";
import Header from "@components/header";
const Sidebar = React.lazy(() => import("@components/sidebar"));

//layout for the site
export default function Index() {
  return (
    <div className="h-screen w-screen flex flex-col bg-stone-950 overflow-hidden">
      {/* <Header /> */}
      <div className="flex-1 flex flex-col-reverse md:flex-row overflow-hidden">
        <Suspense>
          <Sidebar />
        </Suspense>
        <div className="flex-1 flex flex-col overflow-auto">
          <Suspense fallback={<RouteLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
