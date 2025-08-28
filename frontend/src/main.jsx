import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // <-- Import router tools
import App from './App.jsx';
import Login from './components/Login.jsx'; // <-- Import Login
import Signup from './components/SignUp.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

// --- Define your application's pages ---
const router = createBrowserRouter([
  {
    path: "/", // The homepage
    element: <App />,
  },
  {
    path: "/login", // The login page
    element: <Login />,
  },
  {
    path: "/signup", // The signup page
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} /> {/* <-- Use the RouterProvider */}
    </AuthProvider>
  </React.StrictMode>
);