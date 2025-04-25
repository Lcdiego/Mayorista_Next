"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const EcommerceProvider = ({ children }) => {

    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [token, setToken] = useState('');
    const [carrito, setCarrito] = useState([]);
    const [mensajes, setMensajes] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([])


    const [swal, setSwal] = useState(false);

    const router = useRouter()


    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await axios.get('/api/VerifyToken', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsuario(res.data.user);
            } catch (error) {
                console.log('Token inválido o expirado');
                localStorage.removeItem('token');
                setUsuario('');
            }
        };

        verifyUser();
    }, []);





    const MercadoPago = async (productos) => {
        if (!usuario) {
            router.push('/pages/login')
            setMensajes('Inicia sesión para comprar')
            setTimeout(() => {
                setMensajes('')
            }, 3000);
            return
        }
    
        try {
            const items = Array.isArray(productos) ? productos : [productos];
    
            // Formatear los productos
            const formateados = items.map((producto) => {
                const cantidad = producto.cantidad || 1;
    
                // Calcular dimensiones y peso totales
                const pesoTotal = producto.peso * cantidad; // Peso en gramos
                const dimensiones = `${producto.largo}x${producto.ancho}x${producto.alto}`; // Dimensiones en formato largo x ancho x alto
    
                return {
                    title: producto.titulo,
                    price: producto.precio,
                    quantity: cantidad,
                    id: producto._id,
                    dimensions: dimensiones, // Mercado Pago espera la forma "Largo x Ancho x Alto"
                    weight: pesoTotal, // El peso total en gramos
                };
            });
    
            const res = await axios.post("/api/createPreference", {
                items: formateados,
                buyer_zip_code: usuario?.direccion?.codigoPostal || '1903', // Código postal del usuario
            });
    
            window.location.href = res.data.init_point; // Redirigir a Mercado Pago para completar el pago
        } catch (error) {
            console.error("Error al crear la preferencia:", error);
        }
    };
    


    const fetchProductos = async () => {
        try {
            const res = await fetch("/api/Productos/getProductos");
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener productos", error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);



    const fetchCarrito = async () => {
        if (!usuario || !usuario._id) return;
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
        if (usuario?._id)
            fetchCarrito()

    }, [usuario]);


    const fetchBanners = async () => {
        try {

            const response = await fetch('/api/carousel/carouselGet')
            const data = await response.json()


            setBanners(data)

        } catch (error) {
            console.error('eror al cargar imagenes', error)
        }

    }
    useEffect(() => {
        fetchBanners()


    }, [])

    const addCarrito = async (_id, cantidad = 1) => {



        if (!usuario._id) {
            router.push('/pages/login')
            setMensajes('inicia secion para agregar al carrito')
            setTimeout(() => {
                setMensajes('')
            }, 2000);
        }
        try {
            const response = await axios.post('/api/addCarrito', { _id, idUsuario: usuario._id, cantidad });

            setTimeout(() => {
                setSwal(true);
            }, 500);

            fetchCarrito()
        } catch (error) {
            console.log('No se agregó producto al carrito', error);
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        if (swal) {
            const timer = setTimeout(() => setSwal(false), 500);
            return () => clearTimeout(timer);
        }
    }, [swal]);

    const eliminarProductoCart = async (_id) => {


        try {
            const response = await axios.delete('/api/carritoDelete', { data: { _id } })


            fetchCarrito()

        } catch (error) {
            console.log('error al eliminar producto del carrito', error);


        }
    }

    const eliminarProducto = async (_id) => {

        try {

            const response = await axios.delete('/api/Productos/delete', { data: { _id } })
            console.log(response);
            setMensajes(response.data.message);
            setTimeout(() => {
                setMensajes('');
            }, 3000);
            fetchProductos()

        } catch (error) {
            console.log('error para eliminar producto', error);

        }


    }

    const actualizarProducto = async (id, data) => {
        setLoading(true);
        try {
            const response = await axios.put(`/api/Productos/update/${id}`, data);
            setLoading(false);
            fetchProductos();
            setMensajes(response.data.message)
            setTimeout(() => {
                setMensajes('')
            }, 3000);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert("Error al actualizar el producto");
        }
    };

    const eliminarImgCarousel = async (_id) => {

        try {

            const response = await axios.delete('/api/carousel/delete', { data: { _id } })
            console.log(response);

            setMensajes(response.data.message);
            setTimeout(() => {
                setMensajes('');
            }, 3000);
            fetchBanners()

        } catch (error) {
            console.log('error para eliminar producto', error);

        }


    }

    const RegisterUser = async (data) => {
        try {
            const response = await axios.post('/api/user/register', data);

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
    

        try {
            const response = await axios.post('/api/user/login', data);


            const { token, user } = response.data
            localStorage.setItem('token', token);

            setUsuario(user);
            setMensajes("Login exitoso");

            setTimeout(() => {
                setMensajes('');
            }, 2000);
            setTimeout(() => {

            }, 2000);
            if (response.data.user.role === 'admin') {
                router.push('/Sidebar');
            } else {
                router.push('/');
            }

        } catch (error) {
            console.log('Error al logearse');


            setError(error.response?.data?.message || "Error en el servidor");


            setTimeout(() => {
                setError('');
            }, 2000);

          
        }
    };


    const Logout = () => {
        setUsuario(null);
        localStorage.removeItem('token');
        router.push('/');
        
    };

    const agregarProductos = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post('/api/Productos/addProductos', data)
            setLoading(false)
            setMensajes(response.data.message)
            setTimeout(() => {
                setMensajes('')
            }, 3000);
            fetchProductos()
        } catch (error) {
            console.log('Error al agregar product')
        }
    };

    const agregarCarousel = async (data) => {
        setLoading(true)
        try {
            const response = await fetch('/api/carousel/agregarCarousel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            console.log('Imagen subida correctamente', result);
            fetchBanners()
            setLoading(false)
        } catch (error) {
            console.log('Error al cargar imagen:', error.message);
        }
    };

    return (
        <EcommerceContext.Provider value={{ MercadoPago, swal, productos, eliminarProducto, actualizarProducto, eliminarProductoCart, eliminarImgCarousel, addCarrito, carrito, RegisterUser, Login, loading, Logout, usuario, mensajes, error, agregarProductos, agregarCarousel, banners }}>
            {children}
        </EcommerceContext.Provider>
    )
};

export default EcommerceProvider;
