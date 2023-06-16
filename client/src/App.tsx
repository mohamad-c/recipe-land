import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Loign";
import { useDarkMode } from "./contexts/DarkModeContext";
import Switch from "./components/Switch";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    )
  );
  const { toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-no-repeat bg-gray-100 dark:bg-zinc-800 dark:text-gray-200">
      <Switch modeChangeHabdler={toggleDarkMode} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
