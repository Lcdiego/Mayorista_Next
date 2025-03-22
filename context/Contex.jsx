"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const EcommerceProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [carrito, setCarrito] = useState([]);
    const [mensajes, setMensajes] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [seleccionarProductId, setSeleccionarProduct]=useState('');
    const router = useRouter()


const detalle=(_id)=>{
    setSeleccionarProduct(_id)
}

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch("/api/Productos/getProductos");
                const data = await res.json();
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener productos", error);
            }
        };
        fetchProductos();
    }, []);

   
    const fetchCarrito = async () => {
        try {
            const response = await fetch('/api/carritoGet');
            const data = await response.json();

            const carrito = data.carrito;
          

            const carritoUser = carrito.filter((item) => item.usuario === usuario._id);

        

            setCarrito(carritoUser);
        } catch (error) {
            console.error('Error al obtener carrito', error);
        }
    };

    useEffect(() => {
        if (usuario._id) {
            fetchCarrito();
        }
    }, [usuario._id]);

    const addCarrito = async (_id) => {
        try {
            const response = await axios.post('/api/carrito', { _id, idCarrito: usuario._id });
            setMensajes(response.data.messaje);


            fetchCarrito();
        } catch (error) {
            console.log('No se agregó producto al carrito', error);
            console.log(error.response.data.message);
        }
    };
    const eliminarProductoCart = async (_id) => {
       

        try {
            const response = await axios.delete('/api/carritoDelete', { data: { _id } })
            console.log(response);
            fetchCarrito();

        } catch (error) {
            console.log('error al eliminar producto del carrito', error);


        }
    }

    const eliminarProducto = async (_id) => {
        try {

            const response = await axios.delete('/api/Productos/delete', { data: { _id } })
            console.log(response);


        } catch (error) {
            console.log('error para eliminar producto', error);

        }


    }

    const RegisterUser = async (data) => {
        try {
            const response = await axios.post('/api/register', data);

            setMensajes(response.data.message);
            setTimeout(() => {
                setMensajes('')
            }, 3000)

        } catch (error) {
            console.log('Error al crear el usuario');
            setError(error.response.data.message);
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    };

    const Login = async (data) => {
        setLoading(true)

        try {
            const response = await axios.post('/api/login', data);

            setLoading(false)
            setUsuario(response.data.user)



            if (response.data.user.role === 'admin') {
                router.push('/Sidebar')
            } else {
                router.push('/')
            }
        } catch (error) {
            console.log('Error al logearse');
            setError(error.response.data.message)
        }
    };

    const Logout = () => {
        setUsuario('')
        router.push('/')
    };

    const agregarProductos = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post('/api/Productos/addProductos', data)
            setLoading(false)
            setMensajes(response.data.message)
            setTimeout(() => {
                setMensajes('')
            }, 3000)
        } catch (error) {
            console.log('Error al agregar product')
        }
    };

    return (
        <EcommerceContext.Provider value={{seleccionarProductId,detalle, productos, eliminarProducto, eliminarProductoCart, addCarrito, carrito, RegisterUser, Login, loading, Logout, usuario, mensajes, error, agregarProductos }}>
            {children}
        </EcommerceContext.Provider>
    )
};

export default EcommerceProvider;
