import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
const store = configureStore({
    reducer: {
        Products:productReducer
    }
}) 

export default store