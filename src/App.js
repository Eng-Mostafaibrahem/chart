import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOut from './Components/LayOut/LayOut';
import Display from './Components/Display/Display';
import NotFound from "./Components/NotFound/NotFound";
import Chart from "./Components/Chart/Chart";
export default function App() {

  const routers = createBrowserRouter([
    {
      path: "",
      element: <LayOut></LayOut>,
      children: [
        { index: true, element: <Display></Display> },
        { path: "Chart", element: <Chart></Chart> },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);
  return <RouterProvider router={routers}></RouterProvider>;
}
