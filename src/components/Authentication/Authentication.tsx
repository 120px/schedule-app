import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import AuthModel from '../../models/auth/AuthModel'

const Authentication = ({ setUser }: any) => {

    // https://dribbble.com/shots/17564792-Log-in-page-Untitled-UI
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const toggleIsLogin = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsLogin(prev => !prev)

    }

    return (

        <div className='max-md:w-full max-md:px-8 max-md:shadow-none
        md:w-2/3 
        shadow-xl max-w-1/3 w-1/3 bg-white h-full mx-auto px-32 py-8 mt-12'>
            {isLogin === true ?
                <Login toggleIsLogin={toggleIsLogin} setUser={setUser}></Login>
                :
                <Signup toggleIsLogin={toggleIsLogin} setUser={setUser}></Signup>
            }

        </div>
    )
}

export default Authentication