import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    user: null
}

const initialState = { user: null} as UserState

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        register(state){
            
        },

        login(state){
            return state
        }
    }

})

export default userSlice.reducer