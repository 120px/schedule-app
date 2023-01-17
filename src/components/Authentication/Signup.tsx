import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import authProps from '../../models/auth/AuthModel'
import { auth } from "../../firebase-config"
import { useSelector } from "react-redux"

interface UserInput {
    [username: string]: any
}

const Signup = ({ toggleIsLogin }: authProps) => {

    const { user } = useSelector((store:any ) => store)
    console.log(user)
    const [userInput, setUserInput] = useState<UserInput>({ username: "" })

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        userInput[e.currentTarget.name] = e.currentTarget.value
        setUserInput({ ...userInput })
    }

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (userInput["email"] === null) {
            console.log("nope")
            return
        }

        // if (userInput["password"].length < 6) {

        // }

        // if (userInput["confirmPassword"].length < 6) {

        // }

        try {
            const newUser = await createUserWithEmailAndPassword(auth, userInput["email"], userInput["password"])
            console.log(newUser)
        }
        catch (error) {
            console.log("ERROR OCCURED: " + error)
        }
    }

    return (

        <form onSubmit={handleRegisterSubmit}>
            <div className='mb-8 text-center'>
                <h3 className='text-3xl font-semibold mb-4'>Create an account</h3>
                <span className='text-slate-500'>Enter your information</span>
            </div>
            <div className='mb-6'>
                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input onChange={handleUserInput} name="email" type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a username" />
                </div>
                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input onChange={handleUserInput} name="password" type="password" id="password" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*******" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input onChange={handleUserInput} name="confirm_password" type="confirm_password" id="confirmPassword" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </div>

            </div>
            <div className='mb-6'>
                <div className=''>
                    <div>
                        <button className='bg-orange-400 w-full rounded-lg text-white py-3 hover:bg-orange-600'>Sign up</button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div onClick={toggleIsLogin} className='text-center cursor-pointer'>
                        <span >Don't have an account? <span className='text-orange-600'>Sign up</span> </span>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Signup