"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const EcommerceProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState('');
    const [usuarioCarrito, setUsuarioCarrito] = useState('');
    const [mensajes, setMensajes] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const router = useRouter()
console.log(usuarioCarrito);

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


    const addCarrito = async (_id) => {
        console.log(_id, usuarioCarrito);

        try {
            const response = await axios.post('/api/carrito', { _id , email: usuarioCarrito})
            setMensajes(response.data.messaje);

        } catch (error) {
            console.log('no se agrego producto al carrito', error)
            console.log(error.response.data.message);

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
            setUsuarios(response.data.user.nombre)
            setUsuarioCarrito(response.data.user.email)

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
        setUsuarios('')
        router.push('/')
    };

    const agregarProductos = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post('/api/Productos/addProductos', data)
            setLoading(false)
            setMensajes(response.data.message)
        } catch (error) {
            console.log('Error al agregar product')
        }
    };

    return (
        <EcommerceContext.Provider value={{ productos, eliminarProducto, addCarrito, RegisterUser, Login, loading, Logout, usuarios, mensajes, error, agregarProductos }}>
            {children}
        </EcommerceContext.Provider>
    )
};

export default EcommerceProvider;
