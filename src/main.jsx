import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthProvider from './provider/AuthProvider.jsx'




const router = createBrowserRouter([

{
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      
      
    ],
  },
  


])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
