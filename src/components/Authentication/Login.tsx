import React, { useState } from 'react'
import authProps from '../../models/auth/AuthModel'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase-config"

interface UserInput {
    [username: string]: any
}


const Login = ({ toggleIsLogin, setUser }: authProps) => {

    const [userInput, setUserInput] = useState<UserInput>({})

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        userInput[e.currentTarget.name] = e.currentTarget.value
        setUserInput({ ...userInput })
    }

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {

            const loginUser = await signInWithEmailAndPassword(auth, userInput["email"], userInput["password"])
            console.log(loginUser)
            setUser(loginUser)

        } catch (error) {
            console.log("ERROR IN LOGIN: " + error)
        }

    }

    return (
        <form onSubmit={handleRegisterSubmit}>
            <div className='mb-8 text-center'>
                <h3 className='text-3xl font-semibold mb-4'>Grouphere</h3>
                <span className='text-slate-500'>Together in Every Moment.</span>
            </div>
            <div className='mb-6'>
                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input onChange={handleUserInput} name="email" type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input onChange={handleUserInput} name='password' type="password" id="password" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*******" />
                </div>

            </div>
            <div className='mb-6'>
                <div className='flex flex-col justify-between mb-6 text-center'>
                    <div>
                        <input type="checkbox"></input>
                        <label className='pl-2 font-normal'>Remember for 30 days</label>
                    </div>
                    <div>
                        <p className='font-medium text-orange-500'>Forgot password</p>
                    </div>
                </div>
            </div>
            <div className='mb-6'>
                <div className=''>
                    <div>
                        <button className='bg-orange-400 w-full rounded-lg text-white py-3 hover:bg-orange-600'>Sign in</button>
                    </div>
                </div>
            </div>

            <div onClick={toggleIsLogin} className='text-center cursor-pointer'>
                <span >Don't have an account? <span className='text-orange-600' >Sign up</span> </span>
            </div>

        </form>
    )
}

export default Login