import { useNavigate, Form, redirect } from 'react-router-dom';
import {eliminarCliente} from '../data/clientes'


export async function action({ params }) {
  await eliminarCliente(params.IdDelCliente)
  return redirect('/')
}


function Cliente ({ cliente }) {

  const navigate = useNavigate();
  const { nombre, empresa, email, telefono, id, profesion } = cliente;

  return (
    <tr className = "border-b">
        <td className = "p-6 space-y-2">
              <p className = "text-2xl text-gray-900">{nombre}</p>
              <p className = "text-md text-gray-700">Empresa: {empresa}</p>
              <p className = "text-md text-gray-700">Profesion: {profesion}</p>
        </td>

        <td className = "p-6 space-y-2">
            <p className = " text-gray-700">
              <span className = "text-gray-600  uppercase font-bold">Email: </span>
                 {email}
            </p>
            <p className = " text-gray-700">
              <span className = "text-gray-600  uppercase font-bold">Tel: </span>
                 {telefono}
            </p>
        </td>

        <td className = "p-6 flex gap-3 justify-end">
            <button type = "button"
                    className = "text-green-700 p-1 hover:text-green-400 uppercase font-bold text-xs border-4 border-y-emerald-500 border-x-emerald-200"
                    onClick = { () => navigate(`/clientes/${id}/editar`) }
                    >
                    Editar
            </button>

          <Form
              method = 'POST'
              action = {`/clientes/${id}/eliminar`}
              onSubmit={(e)=>{
                if(!confirm('¿Desea eliminar este registro?')){
                  e.preventDefault();
                }
              }}
          >

            <button type = "submit"
                    className = "text-red-700 p-1 hover:text-red-900 uppercase font-bold text-xs border-4 border-y-red-600 border-x-red-200">
                    Eliminar
            </button>

          </Form>
        </td>
    </tr>
  )
};

export default Cliente;