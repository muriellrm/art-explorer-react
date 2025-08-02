import { Loader } from "#/components/Loader";
import NotFound from "#/pages/NotFound";
import React, { Suspense } from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import { PAGE } from "./constants";
import { Home } from "#/pages/Home";
import { Favorites } from "#/pages/Favorites";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader show />}>
      <ReactRoutes>
        <Route path={PAGE.ROOT()} element={<Home />} />
        <Route path={PAGE.FAVORITES()} element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </ReactRoutes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;
