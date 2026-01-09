import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import { User, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, updateProfile } from "firebase/auth"
import AuthModel from '../../models/auth/AuthModel'
import { auth, db } from "../../firebase-config"
import { useForm, SubmitHandler } from "react-hook-form";
import { FirebaseApp } from 'firebase/app'
import { doc, setDoc } from 'firebase/firestore'

interface UserInput {
    [username: string]: any
}

interface FormValidation {
    email: string,
    username: string,
    password: string
}

const Signup = ({ toggleIsLogin, setUser }: AuthModel) => {

    const [userInput, setUserInput] = useState<UserInput>({})
    // Password matching logic removed as we are simplifying to single password field per design
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormValidation>({
        defaultValues: {
            email: "",
            username: "",
            password: "",
        }
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        userInput[e.currentTarget.name] = e.currentTarget.value
        setUserInput({ ...userInput })

    }

    const handleRegisterSubmit = async (data: FormValidation) => {
        // Simplified registration without confirm password check
        try {
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    createUserWithEmailAndPassword(auth, data.email, data.password).then(function (userCredential) {
                        updateProfile(userCredential.user, { displayName: data.username })
                        return userCredential;
                    })
                    .then((userCredential) => {
                        // userCredential might be undefined here if the previous then doesn't return it logic is a bit nested
                        // using auth.currentUser is safer here
                        if (auth.currentUser) {
                            setDoc(doc(db, "users", auth.currentUser.uid), {
                                data,
                                groups: [""]
                            })
                        }
                    })
                })
        }
        catch (error) {
            console.log("ERROR OCCURED: " + error)
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
                <h2 className="text-[#1d120c] dark:text-white text-3xl font-bold tracking-tight">Get started with Grouphere</h2>
                <p className="text-gray-500 dark:text-gray-400">Join friend groups coordinating better today.</p>
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
            
            <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit((data) => {
                    if (!errors.email?.message && !errors.password?.message && !errors.username?.message)
                        handleRegisterSubmit(data)
                })}
            >
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1d120c] dark:text-gray-200">Full Name</label>
                    <input
                        {...register("username", { required: "Please enter a valid username", minLength: { value: 3, message: "Username must be more than 3 characters" } })}
                        onChange={(e) => {
                            register("username").onChange(e); // Allow react-hook-form to update
                            handleUserInput(e); // Keep local state update if needed
                        }}
                        className="flex w-full rounded-lg border border-[#ead7cd] dark:border-gray-700 bg-white dark:bg-[#2d1f18] h-12 px-4 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:text-white"
                        placeholder="Enter your full name" type="text"
                    />
                    {errors.username?.message && <span className='text-xs font-bold text-red-500'>{errors.username?.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1d120c] dark:text-gray-200">Email Address</label>
                    <input
                        {...register("email", {
                            required: "Please enter an email",
                            pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Please enter a valid email address" }
                        })}
                        onChange={(e) => {
                            register("email").onChange(e);
                            handleUserInput(e);
                        }}
                        className="flex w-full rounded-lg border border-[#ead7cd] dark:border-gray-700 bg-white dark:bg-[#2d1f18] h-12 px-4 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:text-white"
                        placeholder="name@company.com" type="email"
                    />
                    {errors.email?.message && <span className='text-xs font-bold text-red-500'>{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-[#1d120c] dark:text-gray-200">Password</label>
                    </div>
                    <input
                        {...register("password", { required: "Please enter a password", minLength: { value: 6, message: "Minimum length for a password is 6" } })}
                        onChange={(e) => {
                            register("password").onChange(e);
                            handleUserInput(e);
                        }}
                        className="flex w-full rounded-lg border border-[#ead7cd] dark:border-gray-700 bg-white dark:bg-[#2d1f18] h-12 px-4 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:text-white"
                        placeholder="Create a strong password" type="password" 
                    />
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Must be at least 8 characters with a mix of letters and numbers.</p>
                    {errors.password?.message && <span className='text-xs font-bold text-red-500'>{errors.password.message}</span>}
                </div>

                <div className="flex items-center gap-2 py-2">
                    <input className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" id="terms" type="checkbox" />
                    <label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="terms">
                        I agree to the <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a>.
                    </label>
                </div>

                <button type="submit" className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary hover:bg-[#ff8855] text-white text-base font-bold transition-colors shadow-lg shadow-primary/20">
                    Create Account
                </button>
            </form>
            
            {/* Footer */}
            <div className="text-center pt-2">
                <p className="text-gray-600 dark:text-gray-400">
                    Already have an account? 
                    <button onClick={toggleIsLogin as any} className="text-primary font-bold hover:underline ml-1">Log in</button>
                </p>
            </div>
        </div>
    )
}

export default Signup