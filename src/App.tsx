import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Grandmasters } from "./pages/grandmasters/grandmasters.page";
import { GrandmasterDetailsPage } from "./pages/grandmaster-details/grandmaster-details.page";
import routes from "./utils/route.utils";

const router = createBrowserRouter([
  {
    path: routes.ROUTE_HOME,
    element: <Navigate to={routes.ROUTE_GRANDMASTERS} replace />,
  },
  {
    path: routes.ROUTE_GRANDMASTERS,
    children: [
      { index: true, element: <Grandmasters /> },
      {
        path: `${routes.ROUTE_GRANDMASTERS}/:username`,
        element: <GrandmasterDetailsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
