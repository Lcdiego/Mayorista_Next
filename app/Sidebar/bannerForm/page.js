"use client";
import { useState } from "react";
import { useEcommerce } from "@/context/Contex";
import Loading from "@/app/componentes/Loading";
import Card from "@/app/componentes/Card";


const BannerForm = () => {
  const { agregarCarousel, loading, mensajes, banners } = useEcommerce();
  const [formData, setFormData] = useState({
    titulo: '',
    imagen: ''

  })
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
    await agregarCarousel({
      titulo: formData.titulo,
      imagen: imageBase64
    });

    setTimeout(() => {
      setFormData({
        titulo: '',
        imagen: ''
      })
    }, 2000);

  }
  return (
    <div className="w-full flex flex-col mt-20">
      <div className="my-14 ml-8 ">
                <h1 className=" text-sm font-semibold bg-gray-300 inline-block px-2 py-1 rounded">Agregar banners</h1>
            </div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
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
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baners</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleFileChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar productos</button>
        {loading ? <p><Loading /></p> : ''}
        {mensajes && <p className="text-2xl text-blue-400 fixed">{mensajes}</p>}
      </form>
      <div className="flex justify-center flex-wrap mt-10">
        {banners.map((items) => (

          <div key={items._id}className="py-5">
            <Card {...items} botonEliminarImgCarousel={true} />
          </div>
        ))}


      </div>
    </div>

  );
}

export default BannerForm 