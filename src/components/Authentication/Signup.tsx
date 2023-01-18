import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import AuthModel from '../../models/auth/AuthModel'
import { auth } from "../../firebase-config"
import { useForm, SubmitHandler } from "react-hook-form";

interface UserInput {
    [username: string]: any
}

interface FormValidation {
    email: string
    password: string
    confirmPassword: string
}

const Signup = ({ toggleIsLogin, setUser }: AuthModel) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValidation>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const [userInput, setUserInput] = useState<UserInput>({ password: "" })

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        userInput[e.currentTarget.name] = e.currentTarget.value
        setUserInput({ ...userInput })
    }

    const handleRegisterSubmit = async (data: FormValidation) => {

        try {
            const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
            setUser(newUser)
        }
        catch (error) {
            console.log("ERROR OCCURED: " + error)
        }
    }

    return (

        <form
            onSubmit={handleSubmit((data) => {
                console.log(data)

                if (!errors.email?.message && !errors.password?.message &&!errors.confirmPassword?.message)
                    handleRegisterSubmit(data)
            })}
        >

            <div className='mb-8 text-center'>
                <h3 className='text-3xl font-semibold mb-4'>Create an account</h3>
                <span className='text-slate-500'>Enter your information</span>
            </div>
            <div className='mb-6'>
                <div className='mb-6'>
                    <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Email</label>

                    {errors.email?.message ? <span className='text-sm text-red-500'>{errors.email.message}</span> : null}
                    <input
                        {...register("email", {
                            required: "Please enter an email",
                            pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Please enter a valid email address" }
                        })}
                        type="text" id="first_name"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a username" />
                </div>
                <div className='mb-6'>
                    <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>

                    {errors.password?.message ? <span className='text-sm text-red-500'>{errors.password.message}</span> : null}
                    <input {...register("password", { required: "Please enter a password", minLength: { value: 6, message: "Minimum length for a password is 6" } })}
                        onChange={handleUserInput} type="password" id="password"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*******" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>

                    {errors.confirmPassword?.message ? <span className='text-sm text-red-500'>{errors.confirmPassword.message}</span> : null}
                    <input
                        {...register("confirmPassword", { required: "Your passwords must match", minLength: {value: 3, message: "XD"} })}
                        name="confirm_password" type="confirm_password" id="confirmPassword" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
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