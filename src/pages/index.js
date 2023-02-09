import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '@/store/features/productSlice'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  let dispatch = useDispatch()
  let products = useSelector((state)=> state?.Products.products)

  useEffect(()=>{
    dispatch(getProducts())
  },[])
  return (
    <>
    <div className='p-4'>
      <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 gap-3'>
        {
          products.map((product,index)=>(
            <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="object-contain h-28 w-90 md:blok md:ml-0 lg:blok lg:ml-32" src={product?.image}/>
              <div className='flex justify-between'>
                <div className=" pl-1 pb-2 font-bold text-md h-4">{product.name}</div>
                {
                  product?.price.split("$")[1] < 200 ? (
                    <>
                      <div className=" text-white text-base bg-green-600 rounded">
                        {product.price}
                      </div>
                    </>
                  ):(
                  <>
                    <div className=" text-white text-base bg-orange-600 rounded">
                        {product.price}
                    </div>
                  </>)
                }
              </div>
              <div className="mt-12 flex justify-center">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">Detail</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}
