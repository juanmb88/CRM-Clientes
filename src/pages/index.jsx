import { useLoaderData } from "react-router-dom";
import {obtenerClientes} from '../data/clientes';
import Cliente from '../componentes/Cliente';


export function loader(){ //exportamos loader se comporta similiar a un useffect , se va ejecutar cuando el componente este listo
  // console.log(import.meta.env)
   const clientes = obtenerClientes()
    return  clientes;
    
  }


//reemplazo el useEffect
const Index = () => {
  const clientes = useLoaderData();//access info loader

  return (
    <>
        <h1 className='m-3 font-black text-4xl text-purple-900'>Clientes</h1>
        <p className='m-3 text-purple-900'>Administra tus Clientes</p>

        { clientes.length ? 
          ( <table className="w-full bg-white shadow mt-5 table-auto">
                    <thead className="bg-green-700 text-white">
                            <tr className="p-2">
                                <th >Cliente</th>
                                <th>Contactos</th>
                                <th>Acciones</th>
                            </tr> 
                    </thead>

                    <tbody>
                        { clientes.map( cliente => (
                            <Cliente  cliente={cliente} 
                                      key={cliente.id}
                                />
                        ) ) }
                    </tbody>
            </table>
           ) : ( <p className="text-center m-10">No hay clientes aun.</p> )
        }
    </>
  )
}

export default Index;