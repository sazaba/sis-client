import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      // Aquí luego agregas rutas:
      // { path: "pricing", element: <PricingPage /> },
      // { path: "contact", element: <ContactPage /> },
    ],
  },
]);
