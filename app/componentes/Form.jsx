"use client";
import { useState } from "react"
import { useEcommerce } from "../../context/Contex";
import Loading from "./Loading";
const Form = () => {
    const { agregarProductos, loading, mensajes } = useEcommerce();

    const [formData, setFormData] = useState(
        {
            Seccion: '',
            Categoria: '',
            titulo: '',
            precio: '',
            stock: '',
            peso: '',
            alto: '',
            ancho: '',
            largo: '',
            descripcion: '',
            imagen: '',
            galeria: ''
        }
    );
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
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




        const imageBase64 = formData.imagen ? await toBase64(formData.imagen) : null;
        const galleryBase64 = formData.galeria.length
            ? await Promise.all(formData.galeria.map(toBase64))
            : [];
        agregarProductos({ ...formData, imagen: imageBase64, galeria: galleryBase64 })

        setTimeout(() => {
            setFormData({
                Seccion: '',
                Categoria: '',
                titulo: '',
                precio: '',
                stock: '',
                peso: '',
                alto: '',
                ancho: '',
                largo: '',
                descripcion: '',
                imagen: '',
                galeria: ''
            })
        }, 3000);



    }

    return (
        <div className="">
            <div className="my-16 ">
                <h1 className=" text-sm font-semibold bg-gray-300 inline-block px-2 py-1 rounded">Agregar productos</h1>
            </div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className='mb-5'>
                    <label htmlFor="agregar seccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agregar seccíon</label>
                    <select
                        id="Seccion "
                        name="Seccion"
                        value={formData.Seccion}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='' disabled>Agregar seccíon</option>

                        <option value='descuentos'>Descuentos</option>
                        <option value='productosExclusivos'>Productos exclusivos</option>
                        <option value='OfertaDelDia'>Oferta del día</option>
                        <option value='FuturosProductos'>Productos futuros</option>
                    </select>
                </div>

                <div className='mb-5'>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agregar categorias</label>
                    <select
                        id="Categoria"
                        name="Categoria"
                        value={formData.Categoria}
                        onChange={handleChange}

                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                        <option value='' disabled >Agregar categorias</option>
                        <option value='consolasYvideosJuegos'>consolas Y videosJuegos</option>
                        <option value='audio'>audio</option>
                        <option value='artCocina'>Art. del hogar</option>
                        <option value='artCocina'>Art. de cocina</option>
                        <option value='bazar'>bazar</option>
                        <option value='golosina'>golosinas</option>
                        <option value='juguetes'>juguetes</option>
                        <option value='juegosDeMesa'>juegos de mesa</option>
                        <option value='celularesYtelefonos'>Celulares y telefonos</option>
                        <option value='computacion'>Computacion </option>
                        <option value='camaraYaccesorios'>Camara y accesorios</option>
                        <option value='artDepezca'>Art de pezca</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Titulo" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Precio" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Stock" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="Peso" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peso</label>
                    <input
                        type="number"
                        id="peso"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Peso" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="Alto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alto</label>
                    <input
                        type="number"
                        id="alto"
                        name="alto"
                        value={formData.alto}
                        onChange={handleChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Alto" required />
                </div>


                <div className="mb-5">
                    <label htmlFor="Ancho" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ancho</label>
                    <input
                        type="number"
                        id="ancho"
                        name="ancho"
                        value={formData.ancho}
                        onChange={handleChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Ancho" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="Largo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Largo</label>
                    <input
                        type="number"
                        id="largo"
                        name="largo"
                        value={formData.largo}
                        onChange={handleChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Largo" required />
                </div>

                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                <div className='mb-5'>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                </div>
                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="galeria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Galeria</label>
                    <input
                        type="file"
                        id="galeria"
                        name="galeria"
                        onChange={handleFileChange}
                        multiple
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar productos</button>
                {loading ? <p><Loading /></p> : ''}
                {mensajes && <p>{mensajes}</p>}
            </form>
        </div>
    )
}

export default Form 