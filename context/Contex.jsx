"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const EcommerceProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [usuarios, setUsuarios] = useState('');
    const [mensajes, setMensajes] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [productos, setProductos] = useState([]);
    const router = useRouter()


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

            if (response.data.user.role === 'admin') {
                router.push('/Sidebar')
            }else{
                router.push('/')
            }
        } catch (error) {
            console.log('Error al logearse');
            setError(error.response.data.message)
        }
    };
    const Logout = () => {
        setToken(null)
        setUsuarios('')
        setMensajes('Usuario deslogueado correctamente')
        setTimeout(() => {
            setMensajes('')
        }, 3000)
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
    useEffect(()=>{
        const productos = async()=>{
            try{
        const response = await axios.get('/api/Productos/getProductos')
 
        
        setProductos(response.data)
            }catch (error){
                console.log('Error al obtener productos')
            }
        }
productos()
    },[])



    return (
        <EcommerceContext.Provider value={{ RegisterUser, Login, loading, Logout, usuarios, mensajes, error,agregarProductos,productos }}>
            {children}
        </EcommerceContext.Provider>
    )
};

export default EcommerceProvider