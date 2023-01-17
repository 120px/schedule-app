import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const Authentication = () => {

    // https://dribbble.com/shots/17564792-Log-in-page-Untitled-UI

    const [isLogin, setIsLogin] = useState<boolean>(true)

    const toggleIsLogin = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.preventDefault()
        setIsLogin(prev => !prev)
        
    }

    return (

        <div className='shadow-xl max-w-xl bg-white h-fit mx-auto p-20 mt-12'>
            {isLogin === true ?
                <Login toggleIsLogin={toggleIsLogin} ></Login>
                :
                <Signup toggleIsLogin={toggleIsLogin}></Signup>
            }


        </div>
    )
}

export default Authentication