import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./router/routes"
const router = createBrowserRouter(routes)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider
        router={router} />
    </>
  )
}

export default App
