// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import style from './styles/index.module.css'
import Home from './views/Home'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Lover from './views/Lover'
import Humorous from './views/Humorous'
import User from './views/User'
import NoMatch from './views/NoMatch'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* <div className={style.title}>Hello world</div> */}
      {/* <Header></Header> */}
      <main className='flex-1 overflow-hidden overflow-y-auto'>
        <Routes>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/humorous' element={<Humorous />}></Route>
          <Route path='/lover' element={<Lover />}></Route>
          <Route path='/user' element={<User />} ></Route>
          {/* <Route path='/user' Component={User} ></Route> */}
          <Route path='/' element={<Navigate replace to="/home" />} /> { /**重定向 */}
          <Route path='*' element={<NoMatch />}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default App
