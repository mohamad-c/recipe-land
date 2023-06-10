import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "./pages/Register";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // <Route path="/" element={}>
      <Route path="/register" element={<RegisterPage />} />
      // </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
