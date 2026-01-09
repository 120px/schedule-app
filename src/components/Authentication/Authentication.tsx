import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import AuthModel from '../../models/auth/AuthModel'

const Authentication = ({ setUser }: any) => {

    const [isLogin, setIsLogin] = useState<boolean>(true)

    const toggleIsLogin = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault()
        setIsLogin(prev => !prev)
    }

    return (
        <div className="flex min-h-screen flex-col lg:flex-row bg-background-light dark:bg-background-dark font-display text-[#1d120c] dark:text-white transition-colors duration-200">
            {/* Left Panel: Branding & Value Prop */}
            <div className="hidden  lg:flex lg:w-5/12 bg-dark-slate p-12 flex-col justify-between relative overflow-hidden">
                <div className="z-10">
                    <div className="flex items-center gap-3 text-white">
                        <div className="size-8 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                                <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">Grouphere</h2>
                    </div>
                </div>
                
                <div className="z-10 flex flex-col gap-6 ">
                    <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                        Coordinate effortlessly with your inner circle.
                    </h1>
                    <p className="text-slate-300 text-lg max-w-md leading-relaxed">
                        Grouphere helps friend groups sync schedules, plan events, and stay connected without the group chat chaos.
                    </p>
                    <div className="flex flex-col gap-4 mt-8">
                        <div className="flex items-center gap-3 text-slate-200">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span>Unified group calendars</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-200">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span>Effortless event RSVP tracking</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-200">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span>Integrated group voting</span>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

                <div className="z-10 text-slate-400 text-sm">
                    © 2026 Grouphere Inc. All rights reserved.
                </div>
            </div>

            {/* Right Panel: Login/Signup Form */}
            <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-12 bg-white dark:bg-background-dark">
                {isLogin ?
                    <Login toggleIsLogin={toggleIsLogin} setUser={setUser} />
                    :
                    <Signup toggleIsLogin={toggleIsLogin} setUser={setUser} />
                }
            </div>
        </div>
    )
}

export default Authentication