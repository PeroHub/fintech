import { configureStore } from '@reduxjs/toolkit'
import countReducer from './toggle'

 const store = configureStore({
    reducer: {
        counter: countReducer,
    },
})

export default store
