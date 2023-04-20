// import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import NoMatch from './views/NoMatch'
import router from './router'
import store from './store'
import { Provider } from 'react-redux'
import './styles/App.css'
import 'virtual:windi.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {/* <RouterProvider router={router} fallbackElement={<NoMatch />}></RouterProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // <React.StrictMode>
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
  // </React.StrictMode>
)
