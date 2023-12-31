import { ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import DestinationShow from "../pages/DestinationShow";

interface Route {
    path: string,
    element: ReactElement,
    errorElement?: ReactElement
}

const routes: Route[] = [
    { path: "/", element: <Home />, errorElement: <Error /> },
    { path: "/:id", element: <DestinationShow /> }
];

const router = createBrowserRouter(routes);

const Router = (): ReactElement => {
    return <RouterProvider router={router} />
};

export default Router;