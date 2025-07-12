import { createHashRouter, RouterProvider } from "react-router-dom";

const routes = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "song/:id", element: <SongScreen /> },
    ],
  },
  {
    path: "*",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
