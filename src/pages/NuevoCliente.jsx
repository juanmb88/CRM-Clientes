import { useNavigate,Form,useActionData} from 'react-router-dom';
import Formulario from '../componentes/Formulario';
import Error from '../componentes/Error';
export async function action({request}){
    const formData = await request.formData()//obtener todos los datos
    const datos = Object.fromEntries(formData)//recupero valores ingresados
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



    //Retornar datos si hay errores
    if(Object.keys(errores).length){
      return errores;
    }


  return { ok: true };
}

function NuevoCliente(){
  //Hook que navegar de manera programada, al presionar un BOTON navega a otra pagina.
  const errores = useActionData()
  const navigate = useNavigate()

  console.log(errores)

  return (
   <>
      <h1 className='text-blue-800 font-bold text-4xl block m-9' to='/'> Nuevo Cliente  </h1>
    
      <p className='text-black font-bold text-xs block m-4'>Llena todos los campos para registrar un nuevo cliente.</p>

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
                <Formulario/>
              
                <input type="submit" 
                      className='mt-5 w-full bg-blue-700 uppercase font-semibold text-white text-lg'
                      value="Registrar Cliente" />
            </Form> 
        </div> 
   </>
  )
};

export default NuevoCliente;