import Image from "next/image"
import Link from "next/link"
Link

const Card = ({ titulo, precio, stock, imagen }) => {
    return (


        <div className="max-w-sm ml-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Link  href="#">
            <div className="flex justify-center" >
            <Image width={200} height={200} className="rounded-t-lg mt-5 w-auto h-60 object-cover" src={imagen} alt={titulo} />
            </div>
                
            </Link>
            <div className="p-5">
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{titulo}</h5>
                </div>
          
                <p>Precio $: {precio}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Stock: {stock}u</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Comprar
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>

    )
}

export default Card 