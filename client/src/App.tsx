import React from 'react'
import Manager from './components/manager'
import Navbar from './components/navBar.tsx'

export default function App() {
  
  return (
    <>
    <div className='flex flex-col min-h-screen container bg-slate-600 text-white'>
    <Navbar/>
    <Manager/>
    </div> 
    </>
  )
}


