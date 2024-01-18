
import Basket from "../Pages/Basket";
import Home from "../Pages/Home";

import UserRoot from "../components/UserRoot";


export const routes = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
    ],
  },
];
