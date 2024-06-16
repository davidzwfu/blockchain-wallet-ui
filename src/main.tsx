import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './stylesheets/index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Export from './pages/Export.tsx'
import ChangePassword from './pages/ChangePassword.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import SendTransaction from './pages/SendTransaction.tsx'
import Receive from './pages/Receive.tsx'
import Start from './pages/Start.tsx'
import StartNew from './pages/StartNew.tsx'
import StartExisting from './pages/StartExisting.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'export',
        element: <Export />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'send-transaction',
        element: <SendTransaction />,
      },
      {
        path: 'receive',
        element: <Receive />,
      },
      {
        path: 'start',
        element: <Start />,
      },
      {
        path: 'start/new',
        element: <StartNew />,
      },
      {
        path: 'start/existing',
        element: <StartExisting />,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
)
