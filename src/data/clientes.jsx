export async function obtenerClientes() {
    const url = 'http://localhost:3000/clientes'
   
    const respuesta = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await respuesta.json()
   
    console.log(resultado)
    return resultado
  }