import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './componentes/Layout';
//pasamos lo exportado en NuevoCliente
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente';//renombrado a nuevoClienteAction
import Index,{loader as clientesLoader} from './pages/index';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index : true,
        element : <Index/>,//este carga clientes
        loader : clientesLoader
      },
      {
        path: '/clientes',
        element: <NuevoCliente/>,//este procesa formulario
        action: nuevoClienteAction
    },]
  }
  

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
