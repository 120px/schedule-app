import React from 'react'
import authProps from '../../models/auth/AuthModel'

const Login = ({ toggleIsLogin }: authProps) => {

    const login = () =>{
        
    }

    return (
        <div>
            <div className='mb-8 text-center'>
                <h3 className='text-3xl font-semibold mb-4'>Welcome back!</h3>
                <span className='text-slate-500'>Please enter your login details</span>
            </div>
            <div className='mb-6'>
                <div className='mb-6'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*******" />
                </div>

            </div>
            <div className='mb-6'>
                <div className='flex flex-row justify-between mb-6'>
                    <div>
                        <input type="checkbox"></input>
                        <label className='pl-2 font-normal'>Remember for 30 days</label>
                    </div>
                    <div>
                        <span className='font-medium text-orange-500'>Forgot password</span>
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

        </div>
    )
}

export default Login