import Head from 'next/head'
import React, {useState, useEffect, use} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '@/store/features/productSlice'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  let dispatch = useDispatch()
  let products = useSelector((state)=> state?.Products.products)
  let [cart, setCart] = useState ([])
  const [openModal, setOpenModal] = useState(false)
  const [afterBuy, setAfterBuy] = useState(false)
  const [cartModal, setCartModal] = useState(false)
  const [success, setSuccess] =  useState(false)
  let [detailItem, setDetailItem] = useState([])
  const openDetail = (productDetail) =>{
    setDetailItem(productDetail)
    if(afterBuy == true){
      setOpenModal(false)
      setSuccess(true)
    }else{
      setOpenModal(true)
    }
  }
  
  useEffect(()=>{
    dispatch(getProducts())
  },[])

  const addCarts = (goods) =>{
    setCart([...cart,goods])
  }

  const goBuy = (goods) =>{
    setCart([...cart,goods])
    setOpenModal(false)
    setCartModal(true)

  }

  const totalPrice = () =>{
    let total = 0
    for(let i = 0 ; i < cart.length; i++){
      let numbeer = parseInt(cart[i].price.split("$")[1])
      total += numbeer
    }
    return `$ ${total}`
  }

 const Order = () =>{
  setOpenModal(false)
  setCartModal(false)
  setSuccess(true)
  setAfterBuy(true)
 }

  const getStar = (rating) =>{
    let temp = []
    let start = <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    for(let i = 0 ; i < rating; i++){
      temp.push(start)
    }
    return temp
  }
  return (
    <>
    <div className='p-4'>
      <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 gap-3'>
        {
          products.map((product,index)=>(
          <>
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
                  <button onClick={()=>openDetail(product)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" >Detail</button>
                </div>
            </div>
          </>
          ))
        }
      </div>
    </div>

    {openModal && (
      <>
      <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <button
                  className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setOpenModal(false)}
                >
                  <span className="bg- text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
                {/*body*/}
                <div className="relative p-6 flex">
                  {/* <div className='object-contain h-28 w-90 md:blok md:ml-0 lg:blok lg:ml-32'> */}
                  <img className="object-contain h-28 w-90 md:blok md:ml-0 lg:blok lg:ml-32" src={detailItem?.image}/>
                  {/* </div> */}
                  <div className='pl-3'>
                    <h1 style={{color:"red"}}>Sale</h1>
                    <div className=" pl-1 pb-2 font-bold text-md h-4">{detailItem.name}</div>
                    <div class="flex items-center pt-2">
                      {
                        getStar(detailItem.rating)
                      }
                      <p class="ml-2 text-sm font-small text-gray-500 dark:text-gray-400">{detailItem.rating} out of 5</p>
                    </div>
                      <p className='ml-2 text-sm font-small text-gray-500 dark:text-gray-400'>({detailItem.reviewCount} reviews)</p>
                      <h2 className='ml-2 text-md bold font-medium'>{detailItem.price}</h2>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => addCarts(detailItem)}
                    >
                      Add to Cart
                    </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => goBuy(detailItem)}
                  >
                    Buy Now !
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      )}

      {
        cartModal && 
        <>
          <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <button
                  className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setCartModal (false)}
                >
                  <span className="bg- text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
                {/*body*/}
                <div class="modal">
                  <div className='modal-content max-w-lg'>
                    <div style={{marginTop:20}}>
                      <form>
                        <div className='flex flex-row items-center mb-1' >
                          <div class="font-bold text-xxl items-center shrink w-60 h-14 pl-5">Name</div>
                          <div class="font-bold text-xxl items-center flex-none w-16 h-14">Price</div>
                        </div>
                        {
                          cart.map((cart,index)=>(
                            <div className='flex flex-row items-center mb-2'>
                              <div class="shrink w-60 h-14 pl-5">
                                <div class="font-bold text-xl">{cart.name}</div>
                              </div>
                              <div class="flex-none w-16 h-14">
                                <div className='flex flex-row items-center'>
                                    <div className='m-1 text-blue-700 text-base'>{cart.price}</div>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                        <div className='flex flex-row items-center mb-2'>
                              <div class="shrink w-60 h-14 pl-5">
                                <div class="font-bold text-xl">Total</div>
                              </div>
                            <div class="flex-none w-16 h-14">
                            <div className='flex flex-row items-center'>
                                <div className='m-1 text-blue-700 text-base'>{totalPrice()}</div>
                            </div>
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
                  </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => Order()}
                  >
                    Buy Now !
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      }

      {
        success && 
         <>
          <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <button
                  className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setSuccess (false)}
                >
                  <span className="bg- text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
                {/*body*/}
                <div className='p-3'>
                <img src="https://www.pngall.com/wp-content/uploads/5/Green-Checklist.png" alt="" className='w-full'/>
                  <div className="font-bold text-md mb-2 flex items-center pb-3 justify-center lg:justify-between lg:p-3">
                    <h1> Yeaayy.. Order Success !!</h1>
                  </div>
                  <div className="flex items-center justify-center lg:justify-between lg:p-3">
                  </div>
              </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      
        </>
      }
    </>
  )
}
