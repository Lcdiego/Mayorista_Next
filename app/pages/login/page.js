"use client";


import React from 'react';
import { useState } from 'react';
import { useEcommerce } from '../../../context/Contex';
import Loading from '../../componentes/Loading';

const Login = () => {
  const { loading, Login, mensajes, error } = useEcommerce()



  const [formData, setFormData] = useState(
    {

      email: '',
      password: ''
    }
  );




  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await Login(formData);

    setFormData({

      email: '',
      password: ''
    })


  }
  return (

    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>
        <input
          onChange={handlechange}
          value={formData.email}
          type="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flow.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input
          onChange={handlechange}
          value={formData.password}
          type="password"
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            name="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recordar</label>
      </div>
      <div className=' flex flex-col'>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ingresar</button>
       
       
        <div className='flex justify-center'>
        <div className='mt-5 '>
          {mensajes && <p className='text-green-700 text-sm font-bold'>{mensajes}</p>}
        </div>
        <div className='mt-5'>
          {error && <p>{error}</p>}
        </div>

        <div className='mt-5'>
          {loading ? <Loading /> : ''}
        </div>

        </div>
       
      </div>

    </form>

  )
}

export default Login