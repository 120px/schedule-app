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
            setUser(loginUser)

        } catch (error) {
            console.log("ERROR IN LOGIN: " + error)
        }

    }

    return (
        <div className="w-full max-w-[440px] flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="lg:hidden flex items-center gap-2 mb-6">
                    <div className="size-6 text-primary">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <span className="font-bold text-xl">Grouphere</span>
                </div>
                <h2 className="text-[#1d120c] dark:text-white text-3xl font-bold tracking-tight">Welcome back</h2>
                <p className="text-gray-500 dark:text-gray-400">Please enter your details to sign in.</p>
            </div>

            {/* Social Signups */}
            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 h-12 px-4 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-semibold text-[#1d120c] dark:text-white">
                        <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYHrpN3z2YdKCnisUSVLJNml2nVWx9j-Yxo83wmCX7OMODdL0uvRzyHN-jUbZ48ujzhg-vNiCK7zUYglVVgp_j8T3YmdVhziJsbkoNK6R7sIfhpuRPX5-x7R7M0mKsM1OdQ6cgzcItMrfcWLi-qPm9BvNR5M1hNP1DPMYU-uMWAK_223MOq4at0IFt5OlosJW-b2Sd-dMbxTavGIBtVivq70wiuarPjdDIpO9h9uhSe2yVld5os_68f9me9iv8RB-TPmbwak69drNk" />
                        <span>Google</span>
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 h-12 px-4 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-semibold text-[#1d120c] dark:text-white">
                        <span className="material-symbols-outlined text-lg">ios</span>
                        <span>Apple</span>
                    </button>
                </div>
                <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-widest font-medium">Or continue with email</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                </div>
            </div>

            {/* Main Form */}
            <form className="flex flex-col gap-5" onSubmit={handleRegisterSubmit}>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1d120c] dark:text-gray-200">Email Address</label>
                    <input 
                        onChange={handleUserInput} 
                        name="email" 
                        type="email" 
                        className="flex w-full rounded-lg border border-[#ead7cd] dark:border-gray-700 bg-white dark:bg-[#2d1f18] h-12 px-4 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:text-white" 
                        placeholder="name@company.com" 
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-[#1d120c] dark:text-gray-200">Password</label>
                    </div>
                    <input 
                        onChange={handleUserInput} 
                        name="password" 
                        type="password" 
                        className="flex w-full rounded-lg border border-[#ead7cd] dark:border-gray-700 bg-white dark:bg-[#2d1f18] h-12 px-4 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:text-white" 
                        placeholder="••••••••" 
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" id="remember" type="checkbox" />
                        <label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="remember">
                            Remember me
                        </label>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
                </div>

                <button type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary hover:bg-[#ff8855] text-white text-base font-bold transition-colors shadow-lg shadow-primary/20">
                    Sign In
                </button>
            </form>

            {/* Footer */}
            <div className="text-center pt-2">
                <p className="text-gray-600 dark:text-gray-400">
                    Don't have an account? 
                    <button onClick={toggleIsLogin as any} className="text-primary font-bold hover:underline ml-1">Create Account</button>
                </p>
            </div>
        </div>
    )
}

export default Login