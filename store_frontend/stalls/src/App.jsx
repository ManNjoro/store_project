import { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import './App.css'
import Signup from './pages/Signup'
import Stores, { storeLoader } from './pages/Stores'
import About from './pages/About'
import StoreDetails, { storeDetailLoader } from './pages/StoreDetails'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='stores' element={<Stores />} loader={storeLoader}/>
      <Route path='stores/:id' element={<StoreDetails />} loader={storeDetailLoader} />
      <Route path='about' element={<About />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
