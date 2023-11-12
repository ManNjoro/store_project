import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
        <NavBar />
        <div className='container' style={{ flex: 1 }}>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}
