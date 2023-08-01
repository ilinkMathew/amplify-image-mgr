import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from './pages/Auth';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path:'/auth',
    element: <Auth/>
  },
  {
    path:'/',
    element: <Auth/>
  },
  {
    path:'/home',
    element: <Home/>
  },
])


function App() {
  return (
    <div className=" w-screen h-screen">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
