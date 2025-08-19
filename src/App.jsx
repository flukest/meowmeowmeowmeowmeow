import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TelegramCallback from './pages/TgCallback';

// React Router v6.3+ approach with createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/telegram-callback",
    element: <TelegramCallback />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;