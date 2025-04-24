"use client";
import { useEffect, useState } from "react";
import { useEcommerce } from "../../../../context/Contex";
import Loading from "../../../componentes/Loading";
import { useParams } from "next/navigation";
import Image from "next/image";

const UpdateProducto = () => {
    const { loading, mensajes, productos, actualizarProducto } = useEcommerce();
    const params = useParams();
    const [formData, setFormData] = useState(null);
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        if (productos.length > 0) {
            const found = productos.find((p) => p._id === params.id);
            if (found) {
                setProducto(found);
                setFormData({
                    Seccion: found.Seccion || '',
                    Categoria: found.Categoria || '',
                    titulo: found.titulo || '',
                    precio: found.precio || '',
                    stock: found.stock || '',
                    peso: found.peso || '',
                    alto: found.alto || '',
                    ancho: found.ancho || '',
                    largo: found.largo || '',
                    descripcion: found.descripcion || '',
                    imagen: found.imagen || '',
                    galeria: found.galeria || [],
                });
            }
        }
    }, [productos, params.id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === "imagen" ? files[0] : Array.from(files),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });

        let imageBase64 = formData.imagen;
        let galleryBase64 = formData.galeria;

        if (formData.imagen instanceof File) {
            imageBase64 = await toBase64(formData.imagen);
        }

        if (formData.galeria.length > 0 && formData.galeria[0] instanceof File) {
            galleryBase64 = await Promise.all(formData.galeria.map(toBase64));
        }

        actualizarProducto(params.id, {
            ...formData,
            imagen: imageBase64,
            galeria: galleryBase64,
        });

        setTimeout(() => {
            setFormData(null);
        }, 3000);
    };

    if (!formData || !producto) {
        return;
    }

    return (
        <div className="w-96 mx-auto">
            <div className="my-16 ">
                <h1 className=" text-sm font-semibold bg-gray-300 inline-block px-2 py-1 rounded">Editar productos</h1>
            </div>
            <form onSubmit={handleSubmit} className="">
                {/* Sección */}
                <div className='mb-5'>
                    <label htmlFor="Seccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agregar sección</label>
                    <select
                        id="Seccion"
                        name="Seccion"
                        value={formData.Seccion}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value='' disabled>Agregar sección</option>
                        <option value='descuentos'>Descuentos</option>
                        <option value='productosExclusivos'>Productos exclusivos</option>
                        <option value='OfertaDelDia'>Oferta del día</option>
                        <option value='FuturosProductos'>Productos futuros</option>
                    </select>
                </div>

                {/* Categoría */}
                <div className='mb-5'>
                    <label htmlFor="Categoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agregar categorías</label>
                    <select
                        id="Categoria"
                        name="Categoria"
                        value={formData.Categoria}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value='' disabled>Agregar categorías</option>
                        <option value='consolasYvideosJuegos'>Consolas y videojuegos</option>
                        <option value='audio'>Audio</option>
                        <option value='artCocina'>Art. de cocina</option>
                        <option value='bazar'>Bazar</option>
                        <option value='golosina'>Golosinas</option>
                        <option value='juguetes'>Juguetes</option>
                        <option value='juegosDeMesa'>Juegos de mesa</option>
                        <option value='celularesYtelefonos'>Celulares y teléfonos</option>
                        <option value='computacion'>Computación</option>
                        <option value='camaraYaccesorios'>Cámara y accesorios</option>
                        <option value='artDepezca'>Art. de pesca</option>
                    </select>
                </div>

                {/* Inputs de texto/números */}
                {[
                    { label: 'Titulo', name: 'titulo', type: 'text' },
                    { label: 'Precio', name: 'precio', type: 'number' },
                    { label: 'Stock', name: 'stock', type: 'number' },
                    { label: 'Peso', name: 'peso', type: 'number' },
                    { label: 'Alto', name: 'alto', type: 'number' },
                    { label: 'Ancho', name: 'ancho', type: 'number' },
                    { label: 'Largo', name: 'largo', type: 'number' },
                ].map(({ label, name, type }) => (
                    <div className="mb-5" key={name}>
                        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                        <input
                            type={type}
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                ))}

                {/* Descripción */}
                <div className='mb-5'>
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Escribí una descripción..."
                    />
                </div>

                {/* Imagen principal */}
                <div className="mb-5">
                    {producto?.imagen && (
                        <Image width={80} height={80} src={producto.imagen} alt={producto.titulo} />
                    )}
                    <label htmlFor="imagen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen principal</label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* Galería */}
                <div className="mb-5">
                    {producto?.galeria?.length > 0 &&
                        producto.galeria.map((item, index) => (
                            <div key={index} className="mb-2">
                                <img
                                    src={item}
                                    alt={`Imagen ${index + 1} de ${formData.titulo}`}
                                    width={80}
                                    height={80}
                                    className="rounded border"
                                />
                            </div>
                        ))}

                    <label htmlFor="galeria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Galería</label>
                    <input
                        type="file"
                        id="galeria"
                        name="galeria"
                        onChange={handleFileChange}
                        multiple
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>


                {/* Botón */}
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Actualizar producto
                </button>


                {mensajes && (
                    <div className="fixed top-20 right-23 z-50 font-semibold text-2xl bg-green-700 rounded-md py-2 px-4 text-white shadow-lg">
                        {mensajes}

                    </div>
                )}
                {loading && (<Loading />)}

            </form>
        </div>
    );
};

export default UpdateProducto;
