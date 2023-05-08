import {Form, useNavigate, useLoaderData, useActionData, redirect} from 'react-router-dom'; 
import {obtenerClienteEditar,actualizarCliente} from '../data/clientes';
import Formulario from '../componentes/Formulario';
import Error from '../componentes/Error';

export async function loader({params}){//loader para obtener info del cliente
    const cliente =  await obtenerClienteEditar(params.IdDelCliente);
      if(Object.values(cliente).length === 0){
            throw new Response('',{
                 status : 404,
                 statusText : 'El cliente no fue encontrado'
        })
    }
    return cliente
};

export async function action({request , params}){
    const formData = await request.formData()//obtener todos los datos
    const datos = Object.fromEntries(formData)//recupero valores ingresados, recupero los datos
    const email = formData.get('email')


    //Validacion
    const errores =[];
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios')
    }
    //valida de formato de email.
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
      errores.push('El email no es valido')
    }

   // Retornar datos si hay errores  
    if(Object.keys(errores).length){
      return errores;
    }
    //actualizar el cliente
    await actualizarCliente(params.IdDelCliente, datos)
    return redirect('/')
    };


const EditarClientes = () => {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();

  return (
    <>
    <h1 className='text-blue-800 font-bold text-4xl block m-9' to='/'> Editar Cliente  </h1>
    <p className='text-black font-bold text-xs block m-4'>A continuacion podras modificar los datos de un cliente.</p>

    <div>
      <button 
         className='bg-blue-800 text-white px-3 py-1 hover:text-red-600 font-bold uppercase'
         onClick={()=>navigate(-1)}>
          {/* 1 nos lleva a la pagina anterior */}
          Volver
      </button>
    </div>
      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-5'>

       {errores?.length && errores.map((error,i) => <Error key={i}> {error} </Error>  )}

          <Form method='post'
                noValidate >{/* deshabilito la validacion de HTML5 */}
              <Formulario
                cliente = {cliente}
                />
            
              <input type="submit" 
                    className='mt-5 w-full bg-blue-700 uppercase font-semibold text-white text-lg'
                    value="Guardar Cambios" />
          </Form> 
      </div> 
 </>
  )
}

export default EditarClientes