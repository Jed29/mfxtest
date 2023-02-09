import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getProducts = createAsyncThunk('products/getProducts', async ()=>{
    return fetch("https://fe.dev.dxtr.asia/api/products")
    .then((response)=> response.json())
    .catch((err)=>{
        console.log(err, "Masuk Error")
    })
})


const productSlice = createSlice(({
    name:"Products",
    initialState:{
        products:[]
    },
    extraReducers:{
        [getProducts.fulfilled] : (state,action) =>{
            state.products = action.payload
        }
    }
}))

export default productSlice.reducer