import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './componentes/Layout';
import Index, { loader as clientesLoader } from './pages/Index'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente';
import ErrorPage from './componentes/ErrorPage';
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction}from './pages/EditarClientes';
import {action as eliminarClienteAction} from './componentes/Cliente';


const router = createBrowserRouter ( [
  {
    path: '/',
    element: <Layout/>,
    children: [
        {
          index: true,
          element: <Index/>,//carga clientes
          loader: clientesLoader,  
          errorElement: <ErrorPage/>
        },
        {
          path: '/clientes/',
          element: <NuevoCliente/>,//procesa formulario
          action: nuevoClienteAction,
          errorElement : <ErrorPage/>
        },
        {
          path : '/clientes/:IdDelCliente/editar',//: permite valor id dinamico
          element : <EditarCliente/>,//Edita cliente
          loader: editarClienteLoader,//obtener cliente
          action : editarClienteAction,//accion para pasar nuevos datos pasados
          errorElement : <ErrorPage/>
        },
        {
          path : '/clientes/:IdDelCliente/eliminar',//los : permite q sea dirferente el valor id (valor dinamico)
          action : eliminarClienteAction
        }
    ]
    }
    

  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
