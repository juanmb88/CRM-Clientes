import {Outlet, Link,useLocation} from 'react-router-dom';

 function Layout(){

 const location = useLocation();

  return (
    <div className='md:flex md:min-h-screen'>
        <aside className='md:w-1/4 bg-green-700 px-5 py-10'>
              <h2 className='text-3xl font-black text-white text-center'>CRM - Clientes</h2>

              <nav className='mt-10'>
                    <Link
                      className={`${location.pathname === '/' ? 'text-purple-400' 
                      : 'text-white'} hover:text-purple-400 text-xl block`}
                      to='/'>Clientes
                    </Link>
                    <Link 
                    className={`${location.pathname === '/clientes' ? 'text-purple-400' 
                      : 'text-white'} hover:text-purple-400 text-xl block `}
                    to='/clientes'>Nuevo Cliente
                    </Link>
              </nav>
        </aside>

        <main className='md:w-3/4 md:h-screen overflow-scroll'>
                  <Outlet/>
        </main>
    </div>
  )
};

export default Layout;