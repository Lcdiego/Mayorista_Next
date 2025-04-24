
import { SiMercadopago } from "react-icons/si";


const BotonMP = () => {



  return (
    <button className="w-full hover:text-white border border-blue-300 text-gray-600 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-300"
    >

      <div className="flex justify-around"><div className="flex items-center"><SiMercadopago size={20} /></div> <div className="ml-8 ">Comprar con Mercado pago</div></div>
    </button>
  )
}

export default BotonMP 