import { useNavigate,Form,useActionData, redirect} from 'react-router-dom';
import Formulario from '../componentes/Formulario';
import Error from '../componentes/Error';
import {agregarCliente} from '../data/clientes';


export async function action({request}){
    const formData = await request.formData();//obtener todos los datos
    const datos = Object.fromEntries(formData);//recupero valores ingresados,datos
    const email = formData.get('email');


    //Validacion
    const errores =[];
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios')
    };
    //valida email.
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
      errores.push('El email no es valido')
    };
    //Retornar datos si hay errores
    if(Object.keys(errores).length){
      return errores;
    };

    await agregarCliente(datos)// codigo que no quiero q corra hasta q termine esta funcion
    return redirect('/')//redireciona en accion y loaders

}

function NuevoCliente(){
 
  const errores = useActionData();//retorna lo que hay en los Action
  const navigate = useNavigate();//redireciona desde un boton

//console.log(errores)

  return (
   <>
      <h1 className='text-green-800 font-bold text-4xl block m-9' to='/'> Nuevo Cliente</h1>
      <p className='text-black font-bold text-xs block m-4'>Llena todos los campos para registrar un nuevo cliente.</p>

      <div>
        <button 
           className='bg-green-800 m-1 text-white px-3 py-1 hover:text-purple-400 font-bold uppercase'
           onClick={() => navigate(-1)}>
            {/* 1 nos lleva a la pagina anterior */}
            Volver
        </button>
      </div>

        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-5'>

        {errores?.length && errores.map((error,i) => <Error key={i}> {error} </Error> )}

          <Form method='post' noValidate >{/* deshabilito la validacion de HTML5 */}
            <Formulario/>
                
          <input type="submit" 
                  className='mt-5 w-full bg-green-700 uppercase font-semibold text-white text-lg'
                  value="Registrar Cliente" />
          </Form> 
        </div> 
   </>
  )
};

export default NuevoCliente;